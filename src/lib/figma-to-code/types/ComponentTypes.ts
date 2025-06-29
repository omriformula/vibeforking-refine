/**
 * Internal Component Type Definitions
 * These represent the classified components our parser creates from Figma nodes
 * Based on our analysis of transformation patterns
 */

import { FigmaNode } from './FigmaTypes';

// Main component classification types
export enum ComponentType {
  // Layout containers
  MAIN_WRAPPER = 'main_wrapper',
  SECTION = 'section',
  CONTAINER = 'container',
  
  // Interactive elements
  BUTTON = 'button',
  INPUT = 'input',
  TABS = 'tabs',
  TAB_TRIGGER = 'tab_trigger',
  
  // Content components
  TEXT = 'text',
  HEADING = 'heading',
  LABEL = 'label',
  IMAGE = 'image',
  
  // Layout components
  CARD = 'card',
  BADGE = 'badge',
  SEPARATOR = 'separator',
  
  // Data components
  DATA_ARRAY = 'data_array',
  CHART = 'chart',
  
  // Unknown/fallback
  UNKNOWN = 'unknown'
}

// Core parsed component interface
export interface ParsedComponent {
  id: string;
  type: ComponentType;
  name: string;
  originalNode: FigmaNode;
  
  // Hierarchy
  children: ParsedComponent[];
  parent?: ParsedComponent;
  
  // Styling
  styles: ComponentStyles;
  
  // Content
  content?: ComponentContent;
  
  // Props and behavior
  props: ComponentProps;
  
  // Data intelligence
  dataPattern?: DataPattern;
  
  // Layout information
  layout: LayoutInfo;
}

// Component styling information
export interface ComponentStyles {
  // Positioning
  position?: 'absolute' | 'relative' | 'fixed' | 'static';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  
  // Dimensions
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  
  // Layout
  display?: 'flex' | 'block' | 'inline' | 'inline-block' | 'grid';
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: string;
  
  // Spacing
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  
  // Background and borders
  backgroundColor?: string;
  backgroundImage?: string;
  borderRadius?: string;
  border?: string;
  borderColor?: string;
  borderWidth?: string;
  
  // Text styling
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  letterSpacing?: string;
  
  // Effects
  boxShadow?: string;
  opacity?: number;
  
  // Tailwind classes (for direct output)
  tailwindClasses: string[];
  
  // CSS custom properties
  customProperties?: Record<string, string>;
}

// Component content (text, images, etc.)
export interface ComponentContent {
  text?: string;
  placeholder?: string;
  imageUrl?: string;
  imageAlt?: string;
  htmlFor?: string; // for labels
  ariaLabel?: string;
}

// Component props and behavior
export interface ComponentProps {
  // Common HTML attributes
  className?: string;
  id?: string;
  role?: string;
  'aria-label'?: string;
  'data-model-id'?: string;
  
  // Interactive properties
  onClick?: string;
  onChange?: string;
  onSubmit?: string;
  disabled?: boolean;
  
  // Form properties
  type?: string; // input type
  name?: string;
  value?: string;
  required?: boolean;
  
  // Button properties
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  
  // shadcn/ui specific props
  asChild?: boolean;
}

// Data pattern information for smart array generation
export interface DataPattern {
  isRepeatable: boolean;
  contextType: UIContext;
  generatedData?: any[];
  dataStructure?: DataStructure;
}

export enum UIContext {
  AUTH = 'auth',
  ECOMMERCE = 'ecommerce',
  FINANCE = 'finance',
  DASHBOARD = 'dashboard',
  SOCIAL = 'social',
  GENERAL = 'general'
}

export interface DataStructure {
  arrayName: string;
  itemType: string;
  properties: DataProperty[];
}

export interface DataProperty {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'url' | 'image';
  example: any;
  required: boolean;
}

// Layout information
export interface LayoutInfo {
  // Original Figma positioning
  originalBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  
  // Computed layout properties
  isContainer: boolean;
  layoutType: 'flex' | 'grid' | 'absolute' | 'flow';
  
  // Auto-layout information
  autoLayout?: {
    direction: 'horizontal' | 'vertical';
    spacing: number;
    padding: {top: number, right: number, bottom: number, left: number};
    align: string;
    justify: string;
  };
}

// Classification confidence and metadata
export interface ClassificationResult {
  component: ParsedComponent;
  confidence: number; // 0-1
  reasons: string[]; // Why this classification was chosen
  alternatives: Array<{
    type: ComponentType;
    confidence: number;
    reason: string;
  }>;
}

// Tree structure for the entire parsed design
export interface ComponentTree {
  root: ParsedComponent;
  components: ParsedComponent[];
  metadata: {
    figmaFileId?: string;
    screenName: string;
    complexity: 'simple' | 'medium' | 'complex';
    totalComponents: number;
    dataArrays: number;
    interactiveElements: number;
  };
}

// Generation context for code output
export interface GenerationContext {
  // Target framework/library
  framework: 'react';
  styleFramework: 'tailwind';
  componentLibrary: 'shadcn-ui';
  
  // Output preferences
  typescript: boolean;
  includeComments: boolean;
  includeDataModelIds: boolean;
  
  // File structure preferences
  singleFile: boolean;
  sectionBased: boolean;
  
  // Naming conventions
  componentNaming: 'PascalCase' | 'camelCase';
  fileNaming: 'PascalCase' | 'kebab-case' | 'camelCase';
}

// Progress tracking for long operations
export interface ParseProgress {
  phase: 'parsing' | 'classifying' | 'generating' | 'complete';
  step: string;
  progress: number; // 0-100
  estimatedTimeRemaining?: number; // seconds
  currentComponent?: string;
}

// Error handling
export interface ParseError {
  type: 'parsing' | 'classification' | 'generation';
  message: string;
  nodeId?: string;
  component?: string;
  suggestion?: string;
  recoverable: boolean;
} 