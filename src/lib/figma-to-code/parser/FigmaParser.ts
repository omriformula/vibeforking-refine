/**
 * Main Figma Parser
 * Orchestrates the complete parsing and generation process
 * Day 1: Core parsing infrastructure + component classification
 */

import { FigmaFile, FigmaNode } from '../types/FigmaTypes';
import { 
  ComponentTree, 
  ParsedComponent, 
  ComponentType, 
  ComponentStyles,
  ComponentContent,
  ComponentProps,
  LayoutInfo,
  ParseProgress,
  ParseError,
  GenerationContext
} from '../types/ComponentTypes';
import { 
  GenerationResult, 
  GenerationCallbacks,
  GenerationProgress 
} from '../types/GenerationTypes';
import { NodeTraverser } from './NodeTraverser';
import { StyleExtractor } from './StyleExtractor';
import { ComponentClassifier } from '../classification/ComponentClassifier';
import { ReactGenerator } from '../generation/ReactGenerator';

export class FigmaParser {
  private nodeTraverser: NodeTraverser;
  private styleExtractor: StyleExtractor;
  private componentClassifier: ComponentClassifier;
  private reactGenerator: ReactGenerator;
  
  private callbacks?: GenerationCallbacks;
  private context: GenerationContext;

  constructor(context?: Partial<GenerationContext>, callbacks?: GenerationCallbacks) {
    this.context = {
      framework: 'react',
      styleFramework: 'tailwind',
      componentLibrary: 'shadcn-ui',
      typescript: true,
      includeComments: true,
      includeDataModelIds: true,
      singleFile: true,
      sectionBased: false,
      componentNaming: 'PascalCase',
      fileNaming: 'PascalCase',
      ...context
    };
    
    this.callbacks = callbacks;
    
    // Initialize sub-components
    this.nodeTraverser = new NodeTraverser();
    this.styleExtractor = new StyleExtractor();
    this.componentClassifier = new ComponentClassifier();
    this.reactGenerator = new ReactGenerator(this.context);
  }

  /**
   * Main parsing method - converts Figma JSON to React components
   */
  async parseToReact(figmaData: FigmaFile | FigmaNode): Promise<GenerationResult> {
    const startTime = Date.now();
    
    try {
      console.log('🔥 FRESH FigmaParser - Build 4:28PM - Starting parsing...');
      
      this.updateProgress({
        phase: 'analyzing',
        step: 'Analyzing Figma structure',
        progress: 0,
        filesGenerated: 0,
        totalFiles: 1
      });

      // Step 1: Extract root node and analyze structure
      const rootNode = this.extractRootNode(figmaData);
      const screenName = this.extractScreenName(rootNode);

      this.updateProgress({
        phase: 'analyzing',
        step: 'Building component tree',
        progress: 10,
        filesGenerated: 0,
        totalFiles: 1
      });

      // Step 2: Traverse and build component tree
      const componentTree = await this.buildComponentTree(rootNode, screenName);

      this.updateProgress({
        phase: 'classifying',
        step: 'Classifying components',
        progress: 30,
        filesGenerated: 0,
        totalFiles: 1
      });

      // Step 3: Classify all components
      await this.classifyComponents(componentTree);

      this.updateProgress({
        phase: 'generating',
        step: 'Generating React code',
        progress: 70,
        filesGenerated: 0,
        totalFiles: 1
      });

      // Step 4: Generate React code
      const generationResult = await this.reactGenerator.generateFromTree(componentTree);

      this.updateProgress({
        phase: 'complete',
        step: 'Generation complete',
        progress: 100,
        filesGenerated: generationResult.files.length,
        totalFiles: generationResult.files.length
      });

      // Add metadata
      generationResult.metadata.generationTimeMs = Date.now() - startTime;

      return generationResult;

    } catch (error) {
      const parseError = {
        type: 'parsing' as const,
        severity: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown parsing error',
        recoverable: false
      };

      this.callbacks?.onError?.(parseError);

      return {
        success: false,
        files: [],
        errors: [parseError],
        warnings: [],
        metadata: {
          generatedAt: new Date(),
          totalFiles: 0,
          totalComponents: 0,
          totalLines: 0,
          framework: this.context.framework,
          styleFramework: this.context.styleFramework,
          componentLibrary: this.context.componentLibrary,
          estimatedComplexity: 'simple',
          generationTimeMs: Date.now() - startTime
        }
      };
    }
  }

  /**
   * Extract the root design node from Figma data
   */
  private extractRootNode(figmaData: FigmaFile | FigmaNode): FigmaNode {
    if ('document' in figmaData) {
      // It's a FigmaFile, need to find the main screen
      return this.nodeTraverser.findMainScreen(figmaData.document);
    } else {
      // It's already a FigmaNode
      return figmaData;
    }
  }

  /**
   * Extract a meaningful screen name from the root node
   */
  private extractScreenName(rootNode: FigmaNode): string {
    // Try to get a meaningful name from the node hierarchy
    if (rootNode.name && rootNode.name !== 'Canvas' && rootNode.name !== 'Page 1') {
      return rootNode.name;
    }
    
    // Look for the first meaningful child name
    if (rootNode.children && rootNode.children.length > 0) {
      const firstChild = rootNode.children[0];
      if (firstChild.name && firstChild.name !== 'Frame') {
        return firstChild.name;
      }
    }
    
    return 'GeneratedScreen';
  }

  /**
   * Build the initial component tree structure
   */
  private async buildComponentTree(rootNode: FigmaNode, screenName: string): Promise<ComponentTree> {
    // Create root component
    const rootComponent: ParsedComponent = {
      id: rootNode.id,
      type: ComponentType.MAIN_WRAPPER,
      name: screenName,
      originalNode: rootNode,
      children: [],
      styles: this.initializeStyles(),
      props: {
        'data-model-id': rootNode.id
      },
      layout: this.extractLayoutInfo(rootNode)
    };

    // Recursively process children
    if (rootNode.children) {
      for (const childNode of rootNode.children) {
        const childComponent = await this.processNode(childNode, rootComponent);
        if (childComponent) {
          rootComponent.children.push(childComponent);
        }
      }
    }

    // Calculate complexity and metadata
    const allComponents = this.nodeTraverser.flattenTree(rootComponent);
    const complexity = this.determineComplexity(allComponents);
    
    console.log(`🏗️  Built component tree: ${allComponents.length} components`);
    console.log('📋 Component breakdown:', allComponents.map(c => `${c.name} (${c.type})`));
    
    return {
      root: rootComponent,
      components: allComponents,
      metadata: {
        screenName,
        complexity,
        totalComponents: allComponents.length,
        dataArrays: 0, // Will be calculated during classification
        interactiveElements: 0 // Will be calculated during classification
      }
    };
  }

  /**
   * Process a single Figma node into a ParsedComponent
   */
  private async processNode(node: FigmaNode, parent: ParsedComponent): Promise<ParsedComponent | null> {
    // Skip invisible nodes
    if (node.visible === false) {
      return null;
    }

    // Create basic component structure  
    const component: ParsedComponent = {
      id: node.id,
      type: ComponentType.UNKNOWN, // Will be classified later
      name: this.generateComponentName(node),
      originalNode: node,
      children: [],
      parent,
      styles: this.styleExtractor.extractStyles(node),
      content: this.extractContent(node),
      props: this.extractProps(node),
      layout: this.extractLayoutInfo(node)
    };

    // Process children recursively
    if (node.children) {
      for (const childNode of node.children) {
        const childComponent = await this.processNode(childNode, component);
        if (childComponent) {
          component.children.push(childComponent);
        }
      }
    }

    return component;
  }

  /**
   * Classify all components in the tree
   */
  private async classifyComponents(tree: ComponentTree): Promise<void> {
    let processedCount = 0;
    const totalCount = tree.components.length;
    const classificationCounts = { BUTTON: 0, INPUT: 0, TEXT: 0, CONTAINER: 0, UNKNOWN: 0 };

    console.log(`🔍 Starting classification of ${totalCount} components...`);

    for (const component of tree.components) {
      // Update progress
      const progress = 30 + (processedCount / totalCount) * 30; // 30-60% range
      this.updateProgress({
        phase: 'classifying',
        step: `Classifying ${component.name}`,
        progress,
        currentComponent: component.name,
        filesGenerated: 0,
        totalFiles: 1
      });

      // Skip classification for root MAIN_WRAPPER to preserve tree structure
      if (component.type === ComponentType.MAIN_WRAPPER) {
        console.log(`🏠 Skipping classification for root MAIN_WRAPPER: "${component.name}"`);
        classificationCounts.CONTAINER++; // Count it as container
        processedCount++;
        continue;
      }

      // Classify the component
      const result = await this.componentClassifier.classify(component);
      component.type = result.component.type;
      
      // Track classification results - Fixed case matching bug
      const typeName = result.component.type.toString().toUpperCase() as keyof typeof classificationCounts;
      if (classificationCounts[typeName] !== undefined) {
        classificationCounts[typeName]++;
      } else {
        classificationCounts.UNKNOWN++;
      }
      
      // Copy over any additional properties from classification
      if (result.component.dataPattern) {
        component.dataPattern = result.component.dataPattern;
      }

      processedCount++;
    }

    // Log classification summary
    console.log('📊 CLASSIFICATION SUMMARY:', classificationCounts);
    console.log(`🎯 Interactive elements found: ${classificationCounts.BUTTON + classificationCounts.INPUT}`);
    
    // Update metadata with classification results
    tree.metadata.dataArrays = tree.components.filter(c => c.dataPattern?.isRepeatable).length;
    tree.metadata.interactiveElements = tree.components.filter(c => 
      c.type === ComponentType.BUTTON || 
      c.type === ComponentType.INPUT ||
      c.type === ComponentType.TABS
    ).length;
  }

  /**
   * Generate a meaningful component name from Figma node
   */
  private generateComponentName(node: FigmaNode): string {
    if (!node.name) {
      return `${node.type}_${node.id.replace(':', '_')}`;
    }

    // Clean up the name
    let name = node.name
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();

    // Convert to PascalCase if needed
    if (this.context.componentNaming === 'PascalCase') {
      name = name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
    }

    return name || 'UnnamedComponent';
  }

  /**
   * Extract content from a Figma node
   */
  private extractContent(node: FigmaNode): ComponentContent | undefined {
    const content: ComponentContent = {};

    // Text content - improved extraction
    if (node.type === 'TEXT' && node.characters) {
      content.text = node.characters;
    }

    // Also check for text in immediate children (important for button detection!)
    if (node.children) {
      for (const child of node.children) {
        if (child.type === 'TEXT' && child.characters) {
          if (!content.text) {
            content.text = child.characters;
          }
        }
      }
    }

    // Image content
    if (node.fills) {
      const imageFill = node.fills.find(fill => fill.type === 'IMAGE');
      if (imageFill && imageFill.imageRef) {
        content.imageUrl = `https://figma-image-url/${imageFill.imageRef}`;
        content.imageAlt = node.name || 'Generated image';
      }
    }

    return Object.keys(content).length > 0 ? content : undefined;
  }

  /**
   * Extract basic props from a Figma node
   */
  private extractProps(node: FigmaNode): ComponentProps {
    const props: ComponentProps = {};

    // Always include data-model-id for debugging
    if (this.context.includeDataModelIds) {
      props['data-model-id'] = node.id;
    }

    return props;
  }

  /**
   * Extract layout information from a Figma node
   */
  private extractLayoutInfo(node: FigmaNode): LayoutInfo {
    const bounds = node.absoluteBoundingBox || { x: 0, y: 0, width: 0, height: 0 };
    
    return {
      originalBounds: bounds,
      isContainer: Boolean(node.children && node.children.length > 0),
      layoutType: this.determineLayoutType(node),
      autoLayout: node.layoutMode ? {
        direction: node.layoutMode === 'HORIZONTAL' ? 'horizontal' : 'vertical',
        spacing: node.itemSpacing || 0,
        padding: {
          top: node.paddingTop || 0,
          right: node.paddingRight || 0,
          bottom: node.paddingBottom || 0,
          left: node.paddingLeft || 0
        },
        align: node.layoutAlign || 'MIN',
        justify: 'flex-start' // Default, could be more sophisticated
      } : undefined
    };
  }

  /**
   * Determine the layout type for a node
   */
  private determineLayoutType(node: FigmaNode): 'flex' | 'grid' | 'absolute' | 'flow' {
    if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
      return 'flex';
    }
    
    if (node.absoluteBoundingBox && node.children) {
      // Check if children seem to be absolutely positioned
      const hasAbsoluteChildren = node.children.some(child => 
        child.constraints?.horizontal === 'SCALE' || 
        child.constraints?.vertical === 'SCALE'
      );
      
      if (hasAbsoluteChildren) {
        return 'absolute';
      }
    }
    
    return 'flow';
  }

  /**
   * Initialize default styles object
   */
  private initializeStyles(): ComponentStyles {
    return {
      tailwindClasses: []
    };
  }

  /**
   * Determine overall complexity of the design
   */
  private determineComplexity(components: ParsedComponent[]): 'simple' | 'medium' | 'complex' {
    const totalComponents = components.length;
    
    if (totalComponents <= 10) {
      return 'simple';
    } else if (totalComponents <= 50) {
      return 'medium';
    } else {
      return 'complex';
    }
  }

  /**
   * Update progress and notify callbacks
   */
  private updateProgress(progress: GenerationProgress): void {
    this.callbacks?.onProgress?.(progress);
  }
}

export default FigmaParser; 