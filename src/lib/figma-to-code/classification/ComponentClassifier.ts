/**
 * Component Classifier
 * Implements transformation rules discovered from 7 Anima examples
 * Classifies Figma nodes into semantic React components
 */

import { ParsedComponent, ComponentType, ClassificationResult, UIContext } from '../types/ComponentTypes';
import { FigmaNode } from '../types/FigmaTypes';
import { ButtonClassifier } from './rules/ButtonClassifier';
import { InputClassifier } from './rules/InputClassifier';
import { TextClassifier } from './rules/TextClassifier';

export class ComponentClassifier {
  private buttonClassifier: ButtonClassifier;
  private inputClassifier: InputClassifier;
  private textClassifier: TextClassifier;

  constructor() {
    this.buttonClassifier = new ButtonClassifier();
    this.inputClassifier = new InputClassifier();
    this.textClassifier = new TextClassifier();
  }

  /**
   * Classify a parsed component and return classification result
   */
  async classify(component: ParsedComponent): Promise<ClassificationResult> {
    const node = component.originalNode;
    const alternatives: Array<{type: ComponentType; confidence: number; reason: string}> = [];

    // 🔥 CACHE BUSTER - FRESH CODE VERIFICATION - BUILD 4:28PM
    console.log(`🔥 FRESH ComponentClassifier - Build 4:28PM - Classifying: "${component.name}"`);

    // Classification pipeline based on our analysis
    
    // 1. Check for interactive elements first (highest priority) - LOWERED THRESHOLDS
    const buttonResult = await this.buttonClassifier.classify(component);
    console.log(`🔘 Button classification for "${component.name}": ${buttonResult.confidence.toFixed(2)} (threshold: 0.2)`);
    if (buttonResult.confidence > 0.2) { // LOWERED from 0.3 to 0.2
      console.log(`✅ BUTTON ACCEPTED: "${component.name}" with confidence ${buttonResult.confidence.toFixed(2)}`);
      return this.createResult(component, ComponentType.BUTTON, buttonResult.confidence, buttonResult.reasons, alternatives);
    }
    alternatives.push({type: ComponentType.BUTTON, confidence: buttonResult.confidence, reason: buttonResult.reasons[0] || 'Low button confidence'});

    const inputResult = await this.inputClassifier.classify(component);
    console.log(`📝 Input classification for "${component.name}": ${inputResult.confidence.toFixed(2)} (threshold: 0.2)`);
    if (inputResult.confidence > 0.2) { // LOWERED from 0.3 to 0.2
      console.log(`✅ INPUT ACCEPTED: "${component.name}" with confidence ${inputResult.confidence.toFixed(2)}`);
      return this.createResult(component, ComponentType.INPUT, inputResult.confidence, inputResult.reasons, alternatives);
    }
    alternatives.push({type: ComponentType.INPUT, confidence: inputResult.confidence, reason: inputResult.reasons[0] || 'Low input confidence'});

    // 2. Check for text components
    const textResult = await this.textClassifier.classify(component);
    if (textResult.confidence > 0.5) {
      const textType = this.determineTextType(component);
      return this.createResult(component, textType, textResult.confidence, textResult.reasons, alternatives);
    }
    alternatives.push({type: ComponentType.TEXT, confidence: textResult.confidence, reason: textResult.reasons[0] || 'Low text confidence'});

    // 3. Check for layout containers
    if (this.isLayoutContainer(component)) {
      const containerType = this.determineContainerType(component);
      return this.createResult(component, containerType, 0.8, ['Has children and layout properties'], alternatives);
    }

    // 4. Check for card patterns
    if (this.isCardPattern(component)) {
      return this.createResult(component, ComponentType.CARD, 0.7, ['Has card-like properties'], alternatives);
    }

    // 5. Check for image content
    if (this.isImageComponent(component)) {
      return this.createResult(component, ComponentType.IMAGE, 0.9, ['Contains image content'], alternatives);
    }

    // 6. Fallback classification
    const fallbackType = this.getFallbackType(component);
    return this.createResult(component, fallbackType, 0.3, ['Fallback classification'], alternatives);
  }

  /**
   * Determine if component is a layout container
   */
  private isLayoutContainer(component: ParsedComponent): boolean {
    const node = component.originalNode;
    
    // Has children
    if (!component.children || component.children.length === 0) {
      return false;
    }

    // Has layout properties
    if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
      return true;
    }

    // Is a frame with multiple children
    if (node.type === 'FRAME' && component.children.length > 1) {
      return true;
    }

    return false;
  }

  /**
   * Determine the type of container
   */
  private determineContainerType(component: ParsedComponent): ComponentType {
    const node = component.originalNode;

    // Check if it's the main wrapper (root level)
    if (!component.parent || component.parent.type === ComponentType.MAIN_WRAPPER) {
      // Check if it should be a section (medium/complex layouts)
      if (component.children.length > 5 || this.hasComplexLayout(component)) {
        return ComponentType.SECTION;
      }
    }

    return ComponentType.CONTAINER;
  }

  /**
   * Check if component has complex layout that warrants section classification
   */
  private hasComplexLayout(component: ParsedComponent): boolean {
    // Based on our analysis: sections are used for distinct functional areas
    const node = component.originalNode;
    
    // Has auto-layout with significant content
    if (node.layoutMode && component.children.length > 3) {
      return true;
    }

    // Has nested containers
    const hasNestedContainers = component.children.some(child => 
      child.originalNode.type === 'FRAME' && child.children.length > 0
    );

    return hasNestedContainers;
  }

  /**
   * Check for card pattern based on our analysis
   */
  private isCardPattern(component: ParsedComponent): boolean {
    const node = component.originalNode;

    // Must be a frame
    if (node.type !== 'FRAME') {
      return false;
    }

    // Has background or border
    const hasBackground = Boolean(node.fills && node.fills.length > 0);
    const hasBorder = Boolean(node.strokes && node.strokes.length > 0);
    const hasCorners = Boolean(node.cornerRadius && node.cornerRadius > 0);

    if (!hasBackground && !hasBorder) {
      return false;
    }

    // Has mixed content (text + other elements)
    const hasText = this.hasTextContent(component);
    const hasOtherElements = component.children.some(child => 
      child.originalNode.type !== 'TEXT'
    );

    return hasText && hasOtherElements && hasCorners;
  }

  /**
   * Check if component contains text content
   */
  private hasTextContent(component: ParsedComponent): boolean {
    // Direct text content
    if (component.originalNode.type === 'TEXT') {
      return true;
    }

    // Text in children
    return component.children.some(child => 
      child.originalNode.type === 'TEXT' || this.hasTextContent(child)
    );
  }

  /**
   * Check if component is an image
   */
  private isImageComponent(component: ParsedComponent): boolean {
    const node = component.originalNode;

    // Has image fill
    if (node.fills) {
      return node.fills.some(fill => fill.type === 'IMAGE');
    }

    // Is a vector/shape that represents an icon
    if (['VECTOR', 'ELLIPSE', 'RECTANGLE'].includes(node.type) && 
        node.name && this.isIconName(node.name)) {
      return true;
    }

    return false;
  }

  /**
   * Check if name suggests an icon
   */
  private isIconName(name: string): boolean {
    const iconPatterns = [
      /icon/i, /arrow/i, /check/i, /close/i, /menu/i, /search/i,
      /star/i, /heart/i, /user/i, /mail/i, /phone/i, /home/i
    ];
    
    return iconPatterns.some(pattern => pattern.test(name));
  }

  /**
   * Determine specific text component type
   */
  private determineTextType(component: ParsedComponent): ComponentType {
    const node = component.originalNode;
    
    if (node.type !== 'TEXT' || !node.style) {
      return ComponentType.TEXT;
    }

    // Check font size for heading classification
    const fontSize = node.style.fontSize;
    const fontWeight = node.style.fontWeight;

    // Large or bold text = heading
    if (fontSize && fontSize >= 20) {
      return ComponentType.HEADING;
    }

    if (fontWeight && fontWeight >= 600) {
      return ComponentType.HEADING;
    }

    // Check if it's a label (positioned above input-like elements)
    if (this.isLabelText(component)) {
      return ComponentType.LABEL;
    }

    return ComponentType.TEXT;
  }

  /**
   * Check if text appears to be a label for form elements
   */
  private isLabelText(component: ParsedComponent): boolean {
    if (!component.parent) return false;

    // Look for input-like siblings
    const siblings = component.parent.children;
    const componentIndex = siblings.indexOf(component);
    
    // Check if next sibling could be an input
    if (componentIndex < siblings.length - 1) {
      const nextSibling = siblings[componentIndex + 1];
      const hasInputCharacteristics = 
        nextSibling.originalNode.name?.toLowerCase().includes('input') ||
        (nextSibling.originalNode.type === 'FRAME' && this.hasInputLikeProperties(nextSibling.originalNode));
      
      if (hasInputCharacteristics) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if node has input-like properties
   */
  private hasInputLikeProperties(node: FigmaNode): boolean {
         // Has border
     const hasBorder = Boolean(node.strokes && node.strokes.length > 0);
    
    // Has placeholder-like text
    const hasPlaceholderText = node.children?.some(child => 
      child.type === 'TEXT' && 
      child.characters && 
      (child.characters.startsWith('Enter') || child.characters.includes('placeholder'))
    );

         // Rectangular shape with reasonable input dimensions
     const bounds = node.absoluteBoundingBox;
     const isInputShape = Boolean(bounds && bounds.width > bounds.height && bounds.height < 60);

    return hasBorder || hasPlaceholderText || isInputShape;
  }

  /**
   * Get fallback component type
   */
  private getFallbackType(component: ParsedComponent): ComponentType {
    const node = component.originalNode;

    // Container types
    if (node.type === 'FRAME' && component.children.length > 0) {
      return ComponentType.CONTAINER;
    }

    // Text types
    if (node.type === 'TEXT') {
      return ComponentType.TEXT;
    }

    // Image types
    if (['VECTOR', 'ELLIPSE', 'RECTANGLE'].includes(node.type)) {
      return ComponentType.IMAGE;
    }

    return ComponentType.UNKNOWN;
  }

  /**
   * Create classification result
   */
  private createResult(
    component: ParsedComponent,
    type: ComponentType,
    confidence: number,
    reasons: string[],
    alternatives: Array<{type: ComponentType; confidence: number; reason: string}>
  ): ClassificationResult {
    // Update the component with the classified type
    const updatedComponent = { ...component, type };

    // Add data pattern if this might be repeatable
    if (this.couldBeRepeatable(updatedComponent)) {
      updatedComponent.dataPattern = {
        isRepeatable: true,
        contextType: this.determineUIContext(updatedComponent),
        generatedData: []
      };
    }

    return {
      component: updatedComponent,
      confidence,
      reasons,
      alternatives
    };
  }

  /**
   * Check if component could be part of a repeatable pattern
   */
  private couldBeRepeatable(component: ParsedComponent): boolean {
    // Based on our analysis: cards, list items, menu items can be repeatable
    if (component.type === ComponentType.CARD) {
      return true;
    }

    // Items that have mixed content and are in a container
    if (component.parent && 
        component.parent.children.length > 1 &&
        this.hasTextContent(component) &&
        (component.type === ComponentType.CONTAINER || component.type === ComponentType.BUTTON)) {
      return true;
    }

    return false;
  }

  /**
   * Determine UI context for data generation
   */
  private determineUIContext(component: ParsedComponent): UIContext {
    const node = component.originalNode;
    const text = this.extractAllText(component).toLowerCase();

    // Check for domain-specific keywords
    if (text.includes('payment') || text.includes('card') || text.includes('checkout')) {
      return UIContext.ECOMMERCE;
    }

    if (text.includes('login') || text.includes('sign') || text.includes('password')) {
      return UIContext.AUTH;
    }

    if (text.includes('dashboard') || text.includes('analytics') || text.includes('chart')) {
      return UIContext.DASHBOARD;
    }

    if (text.includes('payout') || text.includes('balance') || text.includes('finance')) {
      return UIContext.FINANCE;
    }

    if (text.includes('feed') || text.includes('post') || text.includes('like')) {
      return UIContext.SOCIAL;
    }

    return UIContext.GENERAL;
  }

  /**
   * Extract all text content from component and children
   */
  private extractAllText(component: ParsedComponent): string {
    let text = '';
    
    if (component.originalNode.type === 'TEXT' && component.originalNode.characters) {
      text += component.originalNode.characters + ' ';
    }

    if (component.originalNode.name) {
      text += component.originalNode.name + ' ';
    }

    for (const child of component.children) {
      text += this.extractAllText(child);
    }

    return text;
  }
} 