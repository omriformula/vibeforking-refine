/**
 * React Generator
 * Converts parsed component trees into React + Tailwind + shadcn/ui code
 * Based on patterns from 7 Anima examples
 */

import { 
  ComponentTree, 
  ParsedComponent, 
  ComponentType, 
  GenerationContext 
} from '../types/ComponentTypes';
import { 
  GenerationResult, 
  GeneratedFile, 
  FileType,
  ImportStatement,
  JSXElement
} from '../types/GenerationTypes';

export class ReactGenerator {
  private context: GenerationContext;

  constructor(context: GenerationContext) {
    this.context = context;
  }

  /**
   * Generate React code from component tree
   */
  async generateFromTree(tree: ComponentTree): Promise<GenerationResult> {
    const startTime = Date.now();
    
    try {
      const files: GeneratedFile[] = [];
      
      // Generate main component file
      const mainComponent = this.generateMainComponent(tree.root);
      files.push({
        name: `${tree.metadata.screenName}.tsx`,
        path: `${tree.metadata.screenName}.tsx`,
        content: mainComponent,
        type: FileType.COMPONENT,
        dependencies: this.extractDependencies(tree),
        exports: [tree.metadata.screenName]
      });

      return {
        success: true,
        files,
        errors: [],
        warnings: [],
        metadata: {
          generatedAt: new Date(),
          totalFiles: files.length,
          totalComponents: tree.metadata.totalComponents,
          totalLines: this.countLines(files),
          framework: this.context.framework,
          styleFramework: this.context.styleFramework,
          componentLibrary: this.context.componentLibrary,
          estimatedComplexity: tree.metadata.complexity,
          generationTimeMs: Date.now() - startTime
        }
      };

    } catch (error) {
      return {
        success: false,
        files: [],
        errors: [{
          type: 'generation',
          severity: 'error',
          message: error instanceof Error ? error.message : 'Unknown generation error',
          recoverable: false
        }],
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
   * Generate the main React component
   */
  private generateMainComponent(root: ParsedComponent): string {
    const imports = this.generateImports(root);
    const component = this.generateComponentFunction(root);
    
    return `${imports}\n\n${component}`;
  }

  /**
   * Generate import statements
   */
  private generateImports(root: ParsedComponent): string {
    const imports: string[] = [];
    
    // React import
    imports.push("import React from 'react';");
    
    // shadcn/ui components
    const usedComponents = this.findUsedShadcnComponents(root);
    if (usedComponents.length > 0) {
      imports.push(`import { ${usedComponents.join(', ')} } from '@/components/ui';`);
    }
    
    return imports.join('\n');
  }

  /**
   * Find which shadcn/ui components are used
   */
  private findUsedShadcnComponents(component: ParsedComponent): string[] {
    const components = new Set<string>();
    
    const traverse = (comp: ParsedComponent) => {
      switch (comp.type) {
        case ComponentType.BUTTON:
          components.add('Button');
          break;
        case ComponentType.INPUT:
          components.add('Input');
          break;
        case ComponentType.CARD:
          components.add('Card');
          components.add('CardContent');
          break;
        case ComponentType.BADGE:
          components.add('Badge');
          break;
      }
      
      comp.children.forEach(traverse);
    };
    
    traverse(component);
    return Array.from(components);
  }

  /**
   * Generate the component function
   */
  private generateComponentFunction(root: ParsedComponent): string {
    const componentName = root.name;
    const jsx = this.generateJSX(root);
    
    return `export default function ${componentName}() {
  return (
${this.indentLines(jsx, 2)}
  );
}`;
  }

  /**
   * Generate JSX for a component
   */
  private generateJSX(component: ParsedComponent): string {
    console.log(`🏗️ ReactGenerator - Generating JSX for "${component.name}" (${component.type})`);
    
    switch (component.type) {
      case ComponentType.MAIN_WRAPPER:
        return this.generateMainWrapper(component);
      case ComponentType.SECTION:
        return this.generateSection(component);
      case ComponentType.CONTAINER:
        return this.generateContainer(component);
      case ComponentType.BUTTON:
        return this.generateButton(component);
      case ComponentType.INPUT:
        return this.generateInput(component);
      case ComponentType.TEXT:
      case ComponentType.HEADING:
      case ComponentType.LABEL:
        return this.generateText(component);
      case ComponentType.CARD:
        return this.generateCard(component);
      case ComponentType.IMAGE:
        return this.generateImage(component);
      default:
        return this.generateContainer(component);
    }
  }

  /**
   * Generate main wrapper JSX
   */
  private generateMainWrapper(component: ParsedComponent): string {
    const className = this.generateClassName(component);
    
    console.log(`🏗️ MainWrapper "${component.name}" has ${component.children.length} children:`);
    component.children.forEach((child, i) => {
      console.log(`  ${i+1}. "${child.name}" (${child.type}) - ${child.children.length} grandchildren`);
    });
    
    const children = component.children.map(child => this.generateJSX(child)).join('\n');
    
    return `<main${className}${this.generateDataAttributes(component)}>
${this.indentLines(children, 1)}
</main>`;
  }

  /**
   * Generate section JSX
   */
  private generateSection(component: ParsedComponent): string {
    const className = this.generateClassName(component);
    const children = component.children.map(child => this.generateJSX(child)).join('\n');
    
    return `<section${className}${this.generateDataAttributes(component)}>
${this.indentLines(children, 1)}
</section>`;
  }

  /**
   * Recursively collect all interactive descendants from a component
   */
  private collectInteractiveDescendants(component: ParsedComponent): ParsedComponent[] {
    const interactive: ParsedComponent[] = [];
    
    // Check if this component itself is interactive
    if (component.type === ComponentType.BUTTON || component.type === ComponentType.INPUT) {
      interactive.push(component);
    }
    
    // Recursively check children
    for (const child of component.children) {
      interactive.push(...this.collectInteractiveDescendants(child));
    }
    
    return interactive;
  }

  /**
   * Generate container JSX
   */
  private generateContainer(component: ParsedComponent): string {
    const className = this.generateClassName(component);
    
    if (component.children.length > 0) {
      console.log(`📦 Container "${component.name}" (${component.type}) has ${component.children.length} children:`);
      component.children.forEach((child, i) => {
        console.log(`  ${i+1}. "${child.name}" (${child.type})`);
      });
    }
    
    // Collect all interactive descendants (not just immediate children)
    const allInteractiveDescendants = this.collectInteractiveDescendants(component);
    console.log(`📦 Container "${component.name}": Found ${allInteractiveDescendants.length} total interactive descendants:`);
    allInteractiveDescendants.forEach((desc, i) => {
      console.log(`  📍 ${i+1}. "${desc.name}" (${desc.type})`);
    });
    
    // 🚀 BREAKTHROUGH FIX: Generate ALL interactive descendants, not just immediate children
    if (allInteractiveDescendants.length > 1) { // Exclude self from count
      console.log(`🚀 FLATTENING: Generating ${allInteractiveDescendants.length - 1} interactive descendants directly`);
      const interactiveElements = allInteractiveDescendants
        .filter(desc => desc !== component) // Exclude self
        .map(desc => this.generateJSX(desc))
        .join('\n');
      
      return `<div${className}${this.generateDataAttributes(component)}>
${this.indentLines(interactiveElements, 1)}
</div>`;
    }
    
    // Fallback to normal tree traversal for containers with few interactive elements
    const children = component.children.map(child => this.generateJSX(child)).join('\n');
    
    return `<div${className}${this.generateDataAttributes(component)}>
${this.indentLines(children, 1)}
</div>`;
  }

  /**
   * Generate button JSX
   */
  private generateButton(component: ParsedComponent): string {
    const className = this.generateClassName(component);
    const content = this.extractTextContent(component);
    
    console.log(`🎯 ReactGenerator - Generating button for "${component.name}": content="${content}"`);
    
    return `<Button${className}${this.generateDataAttributes(component)}>
  ${content}
</Button>`;
  }

  /**
   * Generate input JSX
   */
  private generateInput(component: ParsedComponent): string {
    const className = this.generateClassName(component);
    const placeholder = this.extractPlaceholder(component);
    
    // If this "input" has children, treat it as a container instead
    if (component.children.length > 0) {
      console.log(`📦 Input "${component.name}" has ${component.children.length} children - treating as container`);
      return this.generateContainer(component);
    }
    
    return `<Input${className}${placeholder}${this.generateDataAttributes(component)} />`;
  }

  /**
   * Generate text JSX
   */
  private generateText(component: ParsedComponent): string {
    const content = component.content?.text || '';
    const tag = component.type === ComponentType.HEADING ? 'h2' : 'p';
    const className = this.generateClassName(component);
    
    return `<${tag}${className}${this.generateDataAttributes(component)}>
  ${content}
</${tag}>`;
  }

  /**
   * Generate card JSX
   */
  private generateCard(component: ParsedComponent): string {
    const className = this.generateClassName(component);
    const children = component.children.map(child => this.generateJSX(child)).join('\n');
    
    return `<Card${className}${this.generateDataAttributes(component)}>
  <CardContent>
${this.indentLines(children, 2)}
  </CardContent>
</Card>`;
  }

  /**
   * Generate image JSX
   */
  private generateImage(component: ParsedComponent): string {
    const className = this.generateClassName(component);
    const src = component.content?.imageUrl || '/placeholder.jpg';
    const alt = component.content?.imageAlt || 'Image';
    
    return `<img${className} src="${src}" alt="${alt}"${this.generateDataAttributes(component)} />`;
  }

  /**
   * Generate className attribute
   */
  private generateClassName(component: ParsedComponent): string {
    const classes = [...component.styles.tailwindClasses];
    
    if (classes.length === 0) {
      return '';
    }
    
    return ` className="${classes.join(' ')}"`;
  }

  /**
   * Generate data attributes
   */
  private generateDataAttributes(component: ParsedComponent): string {
    const attrs: string[] = [];
    
    if (this.context.includeDataModelIds && component.props['data-model-id']) {
      attrs.push(`data-model-id="${component.props['data-model-id']}"`);
    }
    
    return attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
  }

  /**
   * Extract text content from component
   */
  private extractTextContent(component: ParsedComponent): string {
    console.log(`🔍 Extracting text for "${component.name}": component.content?.text="${component.content?.text}"`);
    
    if (component.content?.text) {
      console.log(`✅ Found direct text: "${component.content.text}"`);
      return component.content.text;
    }
    
    // Look for text in children
    console.log(`🔍 Checking ${component.children.length} children for text...`);
    for (const child of component.children) {
      console.log(`  - Child "${child.name}" (${child.originalNode.type}): text="${child.content?.text}"`);
      if (child.originalNode.type === 'TEXT' && child.content?.text) {
        console.log(`✅ Found child text: "${child.content.text}"`);
        return child.content.text;
      }
    }
    
    console.log(`❌ No text found, using fallback "Button"`);
    return 'Button';
  }

  /**
   * Extract placeholder text
   */
  private extractPlaceholder(component: ParsedComponent): string {
    const placeholder = this.extractTextContent(component);
    return placeholder ? ` placeholder="${placeholder}"` : '';
  }

  /**
   * Extract dependencies from tree
   */
  private extractDependencies(tree: ComponentTree): string[] {
    const deps = ['react'];
    
    const usedComponents = this.findUsedShadcnComponents(tree.root);
    if (usedComponents.length > 0) {
      deps.push('@/components/ui');
    }
    
    return deps;
  }

  /**
   * Count lines in generated files
   */
  private countLines(files: GeneratedFile[]): number {
    return files.reduce((total, file) => {
      return total + file.content.split('\n').length;
    }, 0);
  }

  /**
   * Indent lines of text
   */
  private indentLines(text: string, levels: number): string {
    const indent = '  '.repeat(levels);
    return text.split('\n').map(line => line.trim() ? indent + line : line).join('\n');
  }
} 