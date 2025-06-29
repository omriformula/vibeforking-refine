/**
 * Figma-to-Code MVP
 * Main exports for the figma-to-code transformation system
 */

// Main parser
export { FigmaParser as default } from './parser/FigmaParser';
export { FigmaParser } from './parser/FigmaParser';

// Core types
export type { 
  ComponentTree, 
  ParsedComponent, 
  GenerationContext,
  ParseProgress,
  ParseError
} from './types/ComponentTypes';

export type { 
  GenerationResult, 
  GeneratedFile, 
  GenerationCallbacks,
  GenerationProgress
} from './types/GenerationTypes';

export type { 
  FigmaFile, 
  FigmaNode 
} from './types/FigmaTypes';

// Re-export enum for easy access
export { ComponentType } from './types/ComponentTypes'; 