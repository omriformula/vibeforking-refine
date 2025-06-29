/**
 * Button Classifier
 * Identifies button patterns based on analysis of 7 examples
 * Patterns: Background + Text, Click-like names, Interactive styling
 */

import { ParsedComponent } from '../../types/ComponentTypes';
import { FigmaNode } from '../../types/FigmaTypes';

export interface ClassificationResult {
  confidence: number;
  reasons: string[];
}

export class ButtonClassifier {
  
  /**
   * Classify if component is a button
   */
  async classify(component: ParsedComponent): Promise<ClassificationResult> {
    const node = component.originalNode;
    let confidence = 0;
    const reasons: string[] = [];

    // DEBUG: Log what we're analyzing
    console.log(`🔍 ButtonClassifier analyzing: "${node.name}" (${node.type})`, {
      textContent: node.characters,
      bounds: node.absoluteBoundingBox,
      hasChildren: component.children.length > 0
    });

    // Allow FRAME, TEXT, or RECTANGLE to be button candidates
    if (!['FRAME', 'TEXT', 'RECTANGLE'].includes(node.type)) {
      return { confidence: 0, reasons: ['Not a frame, text, or rectangle'] };
    }

    // Check for button indicators
    confidence += this.checkButtonName(node, reasons);
    confidence += this.checkButtonStyling(node, reasons);
    confidence += this.checkButtonContent(component, reasons);
    confidence += this.checkButtonSize(node, reasons);
    confidence += this.checkButtonInteraction(node, reasons);

    // Normalize confidence to 0-1 range
    confidence = Math.min(confidence, 1);

    // DEBUG: Log classification result
    if (confidence > 0.1) {
      console.log(`🎯 ButtonClassifier result for "${node.name}": ${confidence.toFixed(2)} confidence`, reasons);
    }

    return { confidence, reasons };
  }

  /**
   * Check if name suggests a button
   */
  private checkButtonName(node: FigmaNode, reasons: string[]): number {
    if (!node.name) return 0;

    const buttonNames = [
      /button/i, /btn/i, /submit/i, /login/i, /sign.*in/i, /log.*in/i,
      /register/i, /continue/i, /next/i, /back/i, /save/i,
      /cancel/i, /close/i, /ok/i, /yes/i, /no/i, /confirm/i,
      /create/i, /add/i, /delete/i, /edit/i, /update/i,
      /google/i, /microsoft/i, /facebook/i, /github/i, /apple/i,
      /forgot.*password/i, /sign.*up/i, /remember.*me/i
    ];

    for (const pattern of buttonNames) {
      if (pattern.test(node.name)) {
        reasons.push(`Button name pattern: ${node.name}`);
        return 0.4;
      }
    }

    return 0;
  }

  /**
   * Check button styling characteristics
   */
  private checkButtonStyling(node: FigmaNode, reasons: string[]): number {
    let score = 0;

    // Has background fill
    if (node.fills && node.fills.length > 0) {
      const solidFill = node.fills.find(fill => fill.type === 'SOLID');
      if (solidFill) {
        reasons.push('Has solid background fill');
        score += 0.3;
      }
    }

    // Has corner radius (buttons are usually rounded)
    if (node.cornerRadius && node.cornerRadius > 0) {
      reasons.push(`Has corner radius: ${node.cornerRadius}px`);
      score += 0.2;
    }

    // Has appropriate padding
    if (node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
      reasons.push('Has padding (button-like spacing)');
      score += 0.1;
    }

    return score;
  }

  /**
   * Check button content characteristics
   */
  private checkButtonContent(component: ParsedComponent, reasons: string[]): number {
    let score = 0;

    // Check text content - look in component content AND children nodes
    const textFromContent = component.content?.text || '';
    const textNodes = this.findTextNodes(component);
    const textFromNode = component.originalNode.characters || '';
    
    // Combine all text sources
    const allText = textFromContent || textFromNode || (textNodes.length > 0 ? textNodes[0].characters || '' : '');
    
    if (!allText && textNodes.length === 0) {
      // Buttons without text are possible (icon buttons, etc.)
      return score * 0.5; // Reduce confidence but don't eliminate
    }

    if (allText) {
      const text = allText;
      
      // Check for action words (more inclusive patterns)
      const actionWords = [
        /(log|sign).*in/i, /sign.*up/i, /register/i,
        /submit/i, /continue/i, /next/i, /back/i,
        /save/i, /cancel/i, /close/i, /ok/i,
        /create/i, /add/i, /delete/i, /edit/i,
        /buy.*now/i, /purchase/i, /checkout/i,
        /continue.*with/i, /google/i, /microsoft/i, /facebook/i,
        /forgot.*password/i, /remember.*me/i, /get.*started/i
      ];

      for (const pattern of actionWords) {
        if (pattern.test(text)) {
          reasons.push(`Action text: "${text}"`);
          score += 0.3;
          break;
        }
      }

      // Check text length (buttons usually have short text)
      if (text.length <= 20 && text.length > 0) {
        reasons.push('Appropriate text length for button');
        score += 0.1;
      }
    }

    return score;
  }

  /**
   * Check button size characteristics
   */
  private checkButtonSize(node: FigmaNode, reasons: string[]): number {
    if (!node.absoluteBoundingBox) return 0;

    const { width, height } = node.absoluteBoundingBox;
    
    // More flexible button dimensions
    const isButtonWidth = width >= 30 && width <= 500;
    const isButtonHeight = height >= 15 && height <= 100;
    const isButtonRatio = width / height >= 1.0 && width / height <= 15;

    if (isButtonWidth && isButtonHeight && isButtonRatio) {
      reasons.push(`Button-like dimensions: ${width}x${height}`);
      return 0.2;
    }

    return 0;
  }

  /**
   * Check for interaction hints
   */
  private checkButtonInteraction(node: FigmaNode, reasons: string[]): number {
    // Check for hover/pressed states (if available)
    if (node.interactions && node.interactions.length > 0) {
      reasons.push('Has interactions defined');
      return 0.1;
    }

    // Check for cursor hints in name
    if (node.name && /hover|press|click|active/i.test(node.name)) {
      reasons.push('Name suggests interactivity');
      return 0.05;
    }

    return 0;
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