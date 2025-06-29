/**
 * Figma Structure Analyzer
 * Analyzes raw Figma JSON to understand what components exist
 * before they go through our classification pipeline
 */

import { FigmaFile, FigmaNode } from '../types/FigmaTypes';

export interface FigmaNodeAnalysis {
  id: string;
  name: string;
  type: string;
  hasText: boolean;
  hasBackground: boolean;
  hasStroke: boolean;
  hasChildren: boolean;
  childCount: number;
  isInteractive: boolean;
  bounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  textContent?: string;
  depth: number;
}

export interface FigmaAnalysisResult {
  totalNodes: number;
  nodesByType: Record<string, number>;
  potentialButtons: FigmaNodeAnalysis[];
  potentialInputs: FigmaNodeAnalysis[];
  potentialText: FigmaNodeAnalysis[];
  allNodes: FigmaNodeAnalysis[];
  summary: string[];
}

export class FigmaAnalyzer {
  analyze(figmaData: FigmaFile | FigmaNode): FigmaAnalysisResult {
    console.log('🔍 STARTING FIGMA ANALYSIS...');
    const rootNode = this.extractRootNode(figmaData);
    const allNodes: FigmaNodeAnalysis[] = [];
    
    // Traverse and analyze all nodes
    this.traverseAndAnalyze(rootNode, 0, allNodes);
    
    // Count by type
    const nodesByType: Record<string, number> = {};
    allNodes.forEach(node => {
      nodesByType[node.type] = (nodesByType[node.type] || 0) + 1;
    });
    
    // Classify potential UI components
    const potentialButtons = this.findPotentialButtons(allNodes);
    const potentialInputs = this.findPotentialInputs(allNodes);
    const potentialText = this.findPotentialText(allNodes);
    
    // Generate summary
    const summary = this.generateSummary(allNodes, nodesByType, potentialButtons, potentialInputs, potentialText);
    
    return {
      totalNodes: allNodes.length,
      nodesByType,
      potentialButtons,
      potentialInputs,
      potentialText,
      allNodes,
      summary
    };
  }
  
  private extractRootNode(figmaData: FigmaFile | FigmaNode): FigmaNode {
    if ('document' in figmaData) {
      // Navigate to the main screen
      return this.findMainScreen(figmaData.document);
    }
    return figmaData;
  }
  
  private findMainScreen(document: FigmaNode): FigmaNode {
    // Look for the main canvas/frame
    if (document.children && document.children.length > 0) {
      const canvas = document.children[0];
      if (canvas.children && canvas.children.length > 0) {
        // Return the first main frame
        return canvas.children[0];
      }
      return canvas;
    }
    return document;
  }
  
  private traverseAndAnalyze(node: FigmaNode, depth: number, results: FigmaNodeAnalysis[]): void {
    const analysis: FigmaNodeAnalysis = {
      id: node.id,
      name: node.name,
      type: node.type,
      hasText: this.hasText(node),
      hasBackground: this.hasBackground(node),
      hasStroke: this.hasStroke(node),
      hasChildren: !!(node.children && node.children.length > 0),
      childCount: node.children?.length || 0,
      isInteractive: this.isInteractive(node),
      depth,
      bounds: node.absoluteBoundingBox ? {
        x: Math.round(node.absoluteBoundingBox.x),
        y: Math.round(node.absoluteBoundingBox.y),
        width: Math.round(node.absoluteBoundingBox.width),
        height: Math.round(node.absoluteBoundingBox.height)
      } : undefined,
      textContent: this.extractTextContent(node)
    };
    
    results.push(analysis);
    
    // Recursively analyze children
    if (node.children) {
      node.children.forEach(child => {
        this.traverseAndAnalyze(child, depth + 1, results);
      });
    }
  }
  
  private hasText(node: FigmaNode): boolean {
    return node.type === 'TEXT' || 
           (node.type === 'FRAME' && (node.children?.some(child => child.type === 'TEXT') ?? false));
  }
  
  private hasBackground(node: FigmaNode): boolean {
    return !!(node.fills && node.fills.length > 0) ||
           !!(node.background && node.background.length > 0);
  }
  
  private hasStroke(node: FigmaNode): boolean {
    return !!(node.strokes && node.strokes.length > 0);
  }
  
  private isInteractive(node: FigmaNode): boolean {
    return !!(node.interactions && node.interactions.length > 0) ||
           node.name.toLowerCase().includes('button') ||
           node.name.toLowerCase().includes('click');
  }
  
  private extractTextContent(node: FigmaNode): string | undefined {
    if (node.type === 'TEXT' && 'characters' in node) {
      return node.characters as string;
    }
    
    // Look for text in immediate children
    if (node.children) {
      for (const child of node.children) {
        if (child.type === 'TEXT' && 'characters' in child) {
          return child.characters as string;
        }
      }
    }
    
    return undefined;
  }
  
  private findPotentialButtons(nodes: FigmaNodeAnalysis[]): FigmaNodeAnalysis[] {
    console.log(`🔘 Analyzing ${nodes.length} nodes for buttons...`);
    
    const buttons = nodes.filter(node => {
      // Enhanced button heuristics based on actual Figma structure analysis
      const nameIndicatesButton = /button|btn|click|press|submit|login|sign/i.test(node.name);
      const hasInteractiveFeatures = node.isInteractive;
      
      // Look for actual button styling patterns
      const hasButtonStyling = this.hasButtonStyling(node);
      const hasButtonDimensions = this.hasButtonDimensions(node);
      const containsActionableText = this.containsActionableText(node);
      
      // Debug logging for key nodes
      if (node.name.toLowerCase().includes('log in') || 
          node.name.toLowerCase().includes('google') || 
          node.name.toLowerCase().includes('microsoft') ||
          node.textContent?.toLowerCase().includes('log in') ||
          node.textContent?.toLowerCase().includes('continue')) {
        console.log(`🔍 Analyzing key node: "${node.name}" (${node.type})`, {
          textContent: node.textContent,
          bounds: node.bounds,
          hasBackground: node.hasBackground,
          nameIndicatesButton,
          hasInteractiveFeatures,
          hasButtonStyling,
          hasButtonDimensions,
          containsActionableText
        });
      }
      
      // More inclusive criteria
      const isButton = nameIndicatesButton || 
                      hasInteractiveFeatures || 
                      hasButtonStyling ||
                      (hasButtonDimensions && containsActionableText) ||
                      (node.hasBackground && node.hasText && hasButtonDimensions);
      
      return isButton;
    });
    
    console.log(`🔘 Found ${buttons.length} potential buttons:`, buttons.map(b => `"${b.name}" (${b.type})`));
    return buttons;
  }

  private hasButtonStyling(node: FigmaNodeAnalysis): boolean {
    // This would require access to the original Figma node for styling details
    // For now, use bounds and background as proxy
    return node.hasBackground && 
           !!node.bounds && 
           node.bounds.width >= 80 && node.bounds.width <= 500 &&
           node.bounds.height >= 30 && node.bounds.height <= 80;
  }

  private hasButtonDimensions(node: FigmaNodeAnalysis): boolean {
    if (!node.bounds) return false;
    const { width, height } = node.bounds;
    
    // More specific button dimensions based on actual data
    const isButtonWidth = width >= 80 && width <= 600;
    const isButtonHeight = height >= 25 && height <= 100;
    const isButtonRatio = width / height >= 1.5 && width / height <= 20;
    
    return isButtonWidth && isButtonHeight && isButtonRatio;
  }

  private containsActionableText(node: FigmaNodeAnalysis): boolean {
    if (!node.textContent) return false;
    
    const actionPatterns = [
      /log\s*in/i, /sign\s*in/i, /sign\s*up/i, /register/i,
      /continue/i, /submit/i, /save/i, /create/i, /add/i,
      /buy/i, /purchase/i, /checkout/i, /confirm/i,
      /get\s*started/i, /learn\s*more/i, /try/i, /start/i
    ];
    
    return actionPatterns.some(pattern => pattern.test(node.textContent ?? ''));
  }
  
  private findPotentialInputs(nodes: FigmaNodeAnalysis[]): FigmaNodeAnalysis[] {
    return nodes.filter(node => {
      // Enhanced input heuristics
      const nameIndicatesInput = /input|field|text|email|password|search/i.test(node.name);
      const hasInputText = this.hasInputText(node);
      const hasInputDimensions = this.hasInputDimensions(node);
      const hasInputStyling = node.hasStroke || (node.hasBackground && hasInputDimensions);
      
      return nameIndicatesInput || 
             hasInputText ||
             (hasInputDimensions && hasInputStyling);
    });
  }

  private hasInputText(node: FigmaNodeAnalysis): boolean {
    if (!node.textContent) return false;
    
    const inputTextPatterns = [
      /^email$/i, /^password$/i, /^username$/i, /^search$/i,
      /enter.*your/i, /type.*here/i, /placeholder/i,
      /••+/, /\*+/, /\.\.+/, // Common placeholder symbols
    ];
    
    return inputTextPatterns.some(pattern => pattern.test(node.textContent ?? ''));
  }

  private hasInputDimensions(node: FigmaNodeAnalysis): boolean {
    if (!node.bounds) return false;
    const { width, height } = node.bounds;
    
    // Input field dimensions based on actual data
    const isInputWidth = width >= 100 && width <= 600;
    const isInputHeight = height >= 20 && height <= 120;
    const isInputRatio = width / height >= 2 && width / height <= 30;
    
    return isInputWidth && isInputHeight && isInputRatio;
  }
  
  private findPotentialText(nodes: FigmaNodeAnalysis[]): FigmaNodeAnalysis[] {
    return nodes.filter(node => {
      return node.type === 'TEXT' || (node.hasText && !node.hasBackground);
    });
  }
  
  private generateSummary(
    allNodes: FigmaNodeAnalysis[], 
    nodesByType: Record<string, number>,
    potentialButtons: FigmaNodeAnalysis[],
    potentialInputs: FigmaNodeAnalysis[],
    potentialText: FigmaNodeAnalysis[]
  ): string[] {
    const summary = [];
    
    summary.push(`🔍 FIGMA STRUCTURE ANALYSIS`);
    summary.push(`📊 Total nodes found: ${allNodes.length}`);
    summary.push(`📋 Node types:`);
    
    Object.entries(nodesByType)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        summary.push(`  - ${type}: ${count}`);
      });
    
    summary.push(`🎯 POTENTIAL UI COMPONENTS:`);
    summary.push(`  🔘 Potential buttons: ${potentialButtons.length}`);
    summary.push(`  📝 Potential inputs: ${potentialInputs.length}`);
    summary.push(`  📄 Potential text: ${potentialText.length}`);
    
    if (potentialButtons.length > 0) {
      summary.push(`🔘 Button candidates:`);
      potentialButtons.slice(0, 5).forEach(btn => {
        summary.push(`  - "${btn.name}" (${btn.type}) ${btn.bounds ? `[${btn.bounds.width}x${btn.bounds.height}]` : ''}`);
      });
    }
    
    if (potentialInputs.length > 0) {
      summary.push(`📝 Input candidates:`);
      potentialInputs.slice(0, 5).forEach(input => {
        summary.push(`  - "${input.name}" (${input.type}) ${input.bounds ? `[${input.bounds.width}x${input.bounds.height}]` : ''}`);
      });
    }
    
    return summary;
  }
} 