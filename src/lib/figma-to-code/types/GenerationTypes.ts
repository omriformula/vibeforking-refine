/**
 * Generation Type Definitions
 * Types for React code generation and output structures
 */

import { ComponentType, ParsedComponent } from './ComponentTypes';

// Main generation result
export interface GenerationResult {
  success: boolean;
  files: GeneratedFile[];
  errors: GenerationError[];
  warnings: GenerationWarning[];
  metadata: GenerationMetadata;
}

// Individual generated file
export interface GeneratedFile {
  name: string;
  path: string;
  content: string;
  type: FileType;
  dependencies: string[];
  exports: string[];
}

export enum FileType {
  COMPONENT = 'component',
  SECTION = 'section',
  TYPES = 'types',
  STYLES = 'styles',
  INDEX = 'index',
  CONFIG = 'config'
}

// Generation metadata
export interface GenerationMetadata {
  generatedAt: Date;
  totalFiles: number;
  totalComponents: number;
  totalLines: number;
  framework: string;
  styleFramework: string;
  componentLibrary: string;
  estimatedComplexity: 'simple' | 'medium' | 'complex';
  generationTimeMs: number;
}

// React-specific generation types
export interface ReactComponent {
  name: string;
  type: ComponentType;
  imports: ImportStatement[];
  props: ReactProps;
  state?: StateVariable[];
  hooks?: HookUsage[];
  jsx: JSXElement;
  exports: ExportStatement[];
}

// Import statements
export interface ImportStatement {
  type: 'default' | 'named' | 'namespace' | 'side-effect';
  source: string;
  imports: string[];
  alias?: string;
}

// React props interface
export interface ReactProps {
  name?: string; // Interface name (optional for inline props)
  properties: PropProperty[];
  extends?: string[];
}

export interface PropProperty {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: any;
  description?: string;
}

// State variables (for future useState support)
export interface StateVariable {
  name: string;
  type: string;
  initialValue: any;
  setter: string;
}

// Hook usage tracking
export interface HookUsage {
  name: string;
  type: 'useState' | 'useEffect' | 'useCallback' | 'useMemo' | 'custom';
  dependencies?: string[];
  args: any[];
}

// JSX element representation
export interface JSXElement {
  type: 'element' | 'text' | 'expression' | 'fragment';
  tag?: string;
  props?: Record<string, JSXValue>;
  children: JSXChild[];
  selfClosing?: boolean;
}

export type JSXChild = JSXElement | JSXText | JSXExpression;

export interface JSXText {
  type: 'text';
  value: string;
}

export interface JSXExpression {
  type: 'expression';
  code: string;
}

export type JSXValue = 
  | { type: 'string'; value: string }
  | { type: 'expression'; code: string }
  | { type: 'boolean'; value: boolean }
  | { type: 'number'; value: number };

// Export statements
export interface ExportStatement {
  type: 'default' | 'named';
  name: string;
  alias?: string;
}

// Data array generation
export interface DataArrayGeneration {
  arrayName: string;
  itemTypeName: string;
  items: DataItem[];
  contextType: string;
  generation: {
    strategy: 'pattern_extrapolation' | 'realistic_content' | 'placeholder';
    confidence: number;
    reasoning: string[];
  };
}

export interface DataItem {
  properties: Record<string, any>;
  metadata: {
    generated: boolean;
    sourceNodeId?: string;
    contentType: string;
  };
}

// shadcn/ui component mapping
export interface ShadcnComponentMapping {
  figmaPattern: ComponentPattern;
  shadcnComponent: string;
  props: ShadcnPropMapping[];
  imports: string[];
  variants?: VariantMapping[];
}

export interface ComponentPattern {
  nodeType: string;
  hasBackground: boolean;
  hasText: boolean;
  hasCorners: boolean;
  namePatterns: string[];
  stylePatterns: StylePattern[];
}

export interface StylePattern {
  property: string;
  condition: string;
  value?: any;
}

export interface ShadcnPropMapping {
  figmaProperty: string;
  shadcnProp: string;
  transform?: (value: any) => any;
  condition?: (node: ParsedComponent) => boolean;
}

export interface VariantMapping {
  name: string;
  condition: (node: ParsedComponent) => boolean;
  value: string;
}

// Tailwind class generation
export interface TailwindMapping {
  figmaProperty: string;
  generator: (value: any) => string[];
  priority: number; // For conflict resolution
  responsive?: boolean;
  pseudoClasses?: string[];
}

// Code formatting and style
export interface CodeStyle {
  indentation: 'spaces' | 'tabs';
  indentSize: number;
  semicolons: boolean;
  quotes: 'single' | 'double';
  trailingCommas: boolean;
  bracketSpacing: boolean;
  jsxBracketSameLine: boolean;
  maxLineLength: number;
}

// Progress callbacks for UI
export interface GenerationCallbacks {
  onProgress?: (progress: GenerationProgress) => void;
  onFileGenerated?: (file: GeneratedFile) => void;
  onWarning?: (warning: GenerationWarning) => void;
  onError?: (error: GenerationError) => void;
}

export interface GenerationProgress {
  phase: 'analyzing' | 'classifying' | 'generating' | 'formatting' | 'complete';
  step: string;
  progress: number; // 0-100
  currentFile?: string;
  currentComponent?: string;
  filesGenerated: number;
  totalFiles: number;
}

// Error and warning types
export interface GenerationError {
  type: 'parsing' | 'classification' | 'generation' | 'formatting';
  severity: 'error' | 'warning';
  message: string;
  component?: string;
  file?: string;
  line?: number;
  suggestion?: string;
  recoverable: boolean;
}

export interface GenerationWarning {
  type: 'fallback' | 'assumption' | 'optimization' | 'compatibility';
  message: string;
  component?: string;
  suggestion?: string;
}

// Template system for code generation
export interface CodeTemplate {
  name: string;
  type: 'component' | 'section' | 'file';
  template: string;
  variables: TemplateVariable[];
  conditions?: TemplateCondition[];
}

export interface TemplateVariable {
  name: string;
  type: string;
  description: string;
  required: boolean;
  defaultValue?: any;
}

export interface TemplateCondition {
  variable: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'exists';
  value?: any;
  template: string;
}

// Quality metrics for generated code
export interface CodeQuality {
  score: number; // 0-100
  metrics: {
    linting: QualityMetric;
    accessibility: QualityMetric;
    performance: QualityMetric;
    maintainability: QualityMetric;
    semantics: QualityMetric;
  };
  suggestions: QualitySuggestion[];
}

export interface QualityMetric {
  score: number; // 0-100
  issues: QualityIssue[];
  passed: number;
  total: number;
}

export interface QualityIssue {
  type: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  component?: string;
  line?: number;
  suggestion?: string;
}

export interface QualitySuggestion {
  category: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
} 