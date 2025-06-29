/**
 * Node Traverser
 * Utility class for traversing and manipulating Figma node trees
 */

import { FigmaNode } from '../types/FigmaTypes';
import { ParsedComponent } from '../types/ComponentTypes';

export class NodeTraverser {
  
  /**
   * Find the main screen node from a document root
   * Looks for the first meaningful FRAME node
   */
  findMainScreen(documentNode: FigmaNode): FigmaNode {
    // If document has children, look for Canvas
    if (documentNode.children) {
      for (const child of documentNode.children) {
        if (child.type === 'CANVAS') {
          // Look for the main frame within the canvas
          if (child.children) {
            for (const canvasChild of child.children) {
              if (canvasChild.type === 'FRAME' && canvasChild.name) {
                return canvasChild;
              }
            }
          }
          // If no specific frame found, return the canvas
          return child;
        }
      }
    }
    
    // Fallback: return the document itself
    return documentNode;
  }

  /**
   * Flatten a component tree into a linear array
   * Useful for processing all components
   */
  flattenTree(root: ParsedComponent): ParsedComponent[] {
    const result: ParsedComponent[] = [];
    
    const traverse = (component: ParsedComponent) => {
      result.push(component);
      component.children.forEach(traverse);
    };
    
    traverse(root);
    return result;
  }

  /**
   * Find all nodes of a specific type in the tree
   */
  findNodesByType(root: FigmaNode, nodeType: string): FigmaNode[] {
    const result: FigmaNode[] = [];
    
    const traverse = (node: FigmaNode) => {
      if (node.type === nodeType) {
        result.push(node);
      }
      
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    
    traverse(root);
    return result;
  }

  /**
   * Find the parent of a specific node
   */
  findParent(root: FigmaNode, targetId: string): FigmaNode | null {
    const traverse = (node: FigmaNode): FigmaNode | null => {
      if (node.children) {
        for (const child of node.children) {
          if (child.id === targetId) {
            return node;
          }
          
          const result = traverse(child);
          if (result) {
            return result;
          }
        }
      }
      
      return null;
    };
    
    return traverse(root);
  }

  /**
   * Count total nodes in the tree
   */
  countNodes(root: FigmaNode): number {
    let count = 1; // Count the root
    
    if (root.children) {
      for (const child of root.children) {
        count += this.countNodes(child);
      }
    }
    
    return count;
  }

  /**
   * Find text nodes containing specific content
   */
  findTextNodes(root: FigmaNode, searchText?: string): FigmaNode[] {
    const result: FigmaNode[] = [];
    
    const traverse = (node: FigmaNode) => {
      if (node.type === 'TEXT') {
        if (!searchText || (node.characters && node.characters.includes(searchText))) {
          result.push(node);
        }
      }
      
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    
    traverse(root);
    return result;
  }
} 