/**
 * Input Classifier
 * Identifies input field patterns based on analysis of 7 examples
 * Patterns: Border + Text content, Input-like names, Placeholder text
 */

import { ParsedComponent } from '../../types/ComponentTypes';
import { FigmaNode } from '../../types/FigmaTypes';

export interface ClassificationResult {
  confidence: number;
  reasons: string[];
}

export class InputClassifier {
  
  /**
   * Classify if component is an input field
   */
  async classify(component: ParsedComponent): Promise<ClassificationResult> {
    const node = component.originalNode;
    let confidence = 0;
    const reasons: string[] = [];

    // Allow FRAME, RECTANGLE, or TEXT to be input candidates
    if (!['FRAME', 'RECTANGLE', 'TEXT'].includes(node.type)) {
      return { confidence: 0, reasons: ['Not a frame, rectangle, or text'] };
    }

    // Check for input indicators
    confidence += this.checkInputName(node, reasons);
    confidence += this.checkInputStyling(node, reasons);
    confidence += this.checkInputContent(component, reasons);
    confidence += this.checkInputSize(node, reasons);
    confidence += this.checkInputContext(component, reasons);

    // Normalize confidence to 0-1 range
    confidence = Math.min(confidence, 1);

    return { confidence, reasons };
  }

  /**
   * Check if name suggests an input field
   */
  private checkInputName(node: FigmaNode, reasons: string[]): number {
    if (!node.name) return 0;

    const inputNames = [
      /input/i, /field/i, /text.*field/i, /form.*field/i,
      /email/i, /password/i, /username/i, /search/i,
      /textarea/i, /textbox/i, /entry/i, /text$/i,
      /enter.*your/i, /type.*here/i, /placeholder/i
    ];

    for (const pattern of inputNames) {
      if (pattern.test(node.name)) {
        reasons.push(`Input name pattern: ${node.name}`);
        return 0.5;
      }
    }

    return 0;
  }

  /**
   * Check input styling characteristics
   */
  private checkInputStyling(node: FigmaNode, reasons: string[]): number {
    let score = 0;

    // Has border (most inputs have borders)
    if (node.strokes && node.strokes.length > 0) {
      reasons.push('Has border stroke');
      score += 0.4;
    }

    // Light/minimal background
    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID' && fill.color) {
        // Light colors suggest input fields
        const brightness = (fill.color.r + fill.color.g + fill.color.b) / 3;
        if (brightness > 0.9) {
          reasons.push('Light background color');
          score += 0.2;
        }
      }
    }

    // Subtle corner radius
    if (node.cornerRadius && node.cornerRadius > 0 && node.cornerRadius <= 12) {
      reasons.push(`Subtle corner radius: ${node.cornerRadius}px`);
      score += 0.1;
    }

    return score;
  }

  /**
   * Check input content characteristics
   */
  private checkInputContent(component: ParsedComponent, reasons: string[]): number {
    let score = 0;

    // Check text content - look in component content AND children nodes
    const textFromContent = component.content?.text || '';
    const textNodes = this.findTextNodes(component);
    const textFromNode = component.originalNode.characters || '';
    
    // Combine all text sources
    const allTextSources = [textFromContent, textFromNode, ...textNodes.map(n => n.characters || '')].filter(Boolean);
    
    // Check for placeholder-like text
    for (const text of allTextSources) {
      if (!text) continue;
      
      // Placeholder patterns (more inclusive)
      const placeholderPatterns = [
        /enter/i, /type/i, /search/i, /your/i,
        /placeholder/i, /example/i, /\.\.\./,
        /email/i, /password/i, /username/i,
        /\*+/i, /••+/i, /\.+$/i, /hint/i, /e\.g\./i
      ];

      for (const pattern of placeholderPatterns) {
        if (pattern.test(text)) {
          reasons.push(`Placeholder text: "${text}"`);
          score += 0.3;
          break;
        }
      }
    }
    
    // Check text nodes for styling
    for (const textNode of textNodes) {
      // Lighter text color suggests placeholder
      if (textNode.fills && textNode.fills.length > 0) {
        const fill = textNode.fills[0];
        if (fill.type === 'SOLID' && fill.color) {
          const brightness = (fill.color.r + fill.color.g + fill.color.b) / 3;
          if (brightness > 0.5) {
            reasons.push('Light text color (placeholder-like)');
            score += 0.1;
          }
        }
      }
    }

    // Should have some text content
    if (allTextSources.length > 0) {
      score += 0.1;
    }

    return score;
  }

  /**
   * Check input size characteristics
   */
  private checkInputSize(node: FigmaNode, reasons: string[]): number {
    if (!node.absoluteBoundingBox) return 0;

    const { width, height } = node.absoluteBoundingBox;
    
    // More flexible input dimensions
    const isInputWidth = width >= 50 && width <= 600;
    const isInputHeight = height >= 20 && height <= 120;
    const isInputRatio = width / height >= 1.5 && width / height <= 20;

    if (isInputWidth && isInputHeight && isInputRatio) {
      reasons.push(`Input-like dimensions: ${width}x${height}`);
      return 0.2;
    }

    return 0;
  }

  /**
   * Check input context (labels, forms, etc.)
   */
  private checkInputContext(component: ParsedComponent, reasons: string[]): number {
    let score = 0;

    if (!component.parent) return 0;

    // Check if previous sibling is a label
    const siblings = component.parent.children;
    const componentIndex = siblings.indexOf(component);
    
    if (componentIndex > 0) {
      const previousSibling = siblings[componentIndex - 1];
      if (this.isLabelLike(previousSibling)) {
        reasons.push('Has label-like previous sibling');
        score += 0.2;
      }
    }

    // Check if parent suggests form context
    if (component.parent.originalNode.name) {
      const parentName = component.parent.originalNode.name;
      if (/form|login|register|signup|contact/i.test(parentName)) {
        reasons.push(`Form-like parent: ${parentName}`);
        score += 0.1;
      }
    }

    return score;
  }

  /**
   * Check if component is label-like
   */
  private isLabelLike(component: ParsedComponent): boolean {
    // Must have text
    const textNodes = this.findTextNodes(component);
    if (textNodes.length === 0) return false;

    // Short descriptive text
    const text = textNodes[0].characters || '';
    const labelPatterns = [
      /^email$/i, /^password$/i, /^username$/i, /^name$/i,
      /^phone$/i, /^address$/i, /^message$/i, /^subject$/i,
      /^first.*name$/i, /^last.*name$/i, /^company$/i
    ];

    return labelPatterns.some(pattern => pattern.test(text));
  }

  /**
   * Find all text nodes in component
   */
  private findTextNodes(component: ParsedComponent): FigmaNode[] {
    const results: FigmaNode[] = [];
    
    const traverse = (comp: ParsedComponent) => {
      if (comp.originalNode.type === 'TEXT') {
        results.push(comp.originalNode);
      }
      
      comp.children.forEach(traverse);
    };
    
    traverse(component);
    return results;
  }
} 