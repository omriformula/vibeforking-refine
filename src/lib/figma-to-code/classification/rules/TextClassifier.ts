/**
 * Text Classifier
 * Identifies text components and their types based on analysis of 7 examples
 */

import { ParsedComponent } from '../../types/ComponentTypes';
import { FigmaNode } from '../../types/FigmaTypes';

export interface ClassificationResult {
  confidence: number;
  reasons: string[];
}

export class TextClassifier {
  
  async classify(component: ParsedComponent): Promise<ClassificationResult> {
    const node = component.originalNode;
    let confidence = 0;
    const reasons: string[] = [];

    // Must be a TEXT node
    if (node.type !== 'TEXT') {
      return { confidence: 0, reasons: ['Not a TEXT node'] };
    }

    if (node.characters) {
      reasons.push(`Has text content: "${node.characters}"`);
      confidence += 0.5;
    }

    if (node.style) {
      reasons.push('Has text styling');
      confidence += 0.3;
    }

    confidence = Math.min(confidence, 1);
    return { confidence, reasons };
  }
} 