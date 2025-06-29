/**
 * Figma JSON Type Definitions
 * Based on analysis of 7 Anima examples
 * Supports: Login, Mastercard, Overview, Buyer, Payment, Daccord, Discover
 */

export interface FigmaFile {
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  schemaVersion: number;
  styles: Record<string, FigmaStyle>;
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  role: string;
  editorType: string;
  linkAccess: string;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: FigmaNodeType;
  scrollBehavior?: 'SCROLLS' | 'FIXED';
  children?: FigmaNode[];
  visible?: boolean;
  locked?: boolean;
  
  // Layout properties
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  layoutAlign?: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  layoutGrow?: number;
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
  
  // Positioning
  absoluteBoundingBox?: FigmaBoundingBox;
  absoluteRenderBounds?: FigmaBoundingBox;
  constraints?: FigmaConstraints;
  
  // Styling
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  strokeWeight?: number;
  strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  cornerRadius?: number;
  cornerSmoothing?: number;
  background?: FigmaPaint[];
  backgroundColor?: FigmaColor;
  
  // Text properties (for TEXT nodes)
  characters?: string;
  style?: FigmaTextStyle;
  characterStyleOverrides?: number[];
  styleOverrideTable?: Record<string, FigmaTextStyle>;
  
  // Effects
  effects?: FigmaEffect[];
  blendMode?: FigmaBlendMode;
  opacity?: number;
  
  // Component properties
  componentId?: string;
  overrides?: FigmaOverride[];
  
  // Auto layout properties
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
  
  // Interaction properties
  interactions?: FigmaInteraction[];
}

export type FigmaNodeType = 
  | 'DOCUMENT'
  | 'CANVAS' 
  | 'FRAME'
  | 'GROUP'
  | 'VECTOR'
  | 'BOOLEAN_OPERATION'
  | 'STAR'
  | 'LINE'
  | 'ELLIPSE'
  | 'REGULAR_POLYGON'
  | 'RECTANGLE'
  | 'TEXT'
  | 'SLICE'
  | 'COMPONENT'
  | 'COMPONENT_SET'
  | 'INSTANCE';

export interface FigmaBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FigmaConstraints {
  vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'TOP_BOTTOM' | 'SCALE';
  horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'LEFT_RIGHT' | 'SCALE';
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FigmaPaint {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE';
  color?: FigmaColor;
  blendMode?: FigmaBlendMode;
  opacity?: number;
  gradientHandlePositions?: FigmaVector[];
  gradientStops?: FigmaColorStop[];
  scaleMode?: 'FILL' | 'FIT' | 'CROP' | 'TILE';
  imageTransform?: number[][];
  scalingFactor?: number;
  imageRef?: string;
  filters?: FigmaImageFilters;
  gifRef?: string;
}

export interface FigmaVector {
  x: number;
  y: number;
}

export interface FigmaColorStop {
  position: number;
  color: FigmaColor;
}

export interface FigmaImageFilters {
  exposure?: number;
  contrast?: number;
  saturation?: number;
  temperature?: number;
  tint?: number;
  highlights?: number;
  shadows?: number;
}

export type FigmaBlendMode = 
  | 'PASS_THROUGH'
  | 'NORMAL'
  | 'DARKEN'
  | 'MULTIPLY'
  | 'LINEAR_BURN'
  | 'COLOR_BURN'
  | 'LIGHTEN'
  | 'SCREEN'
  | 'LINEAR_DODGE'
  | 'COLOR_DODGE'
  | 'OVERLAY'
  | 'SOFT_LIGHT'
  | 'HARD_LIGHT'
  | 'DIFFERENCE'
  | 'EXCLUSION'
  | 'HUE'
  | 'SATURATION'
  | 'COLOR'
  | 'LUMINOSITY';

export interface FigmaTextStyle {
  fontFamily: string;
  fontPostScriptName?: string;
  fontWeight: number;
  fontStyle?: string;
  fontSize: number;
  textAlignHorizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
  textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
  letterSpacing: number;
  lineHeightPx: number;
  lineHeightPercent: number;
  lineHeightPercentFontSize?: number;
  lineHeightUnit: 'PIXELS' | 'FONT_SIZE_%' | 'INTRINSIC_%';
  textAutoResize?: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT';
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
  textCase?: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
}

export interface FigmaEffect {
  type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  visible: boolean;
  radius: number;
  color?: FigmaColor;
  blendMode?: FigmaBlendMode;
  offset?: FigmaVector;
  spread?: number;
  showShadowBehindNode?: boolean;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  documentationLinks: any[];
  remote: boolean;
  componentSetId?: string;
}

export interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  remote: boolean;
  styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
}

export interface FigmaOverride {
  id: string;
  overriddenFields: string[];
}

export interface FigmaInteraction {
  trigger: FigmaTrigger;
  actions: FigmaAction[];
}

export interface FigmaTrigger {
  type: 'ON_CLICK' | 'ON_HOVER' | 'ON_PRESS' | 'ON_DRAG' | 'AFTER_TIMEOUT' | 'MOUSE_ENTER' | 'MOUSE_LEAVE' | 'MOUSE_UP' | 'MOUSE_DOWN';
  delay?: number;
}

export interface FigmaAction {
  type: 'NAVIGATE' | 'URL' | 'SCROLL_TO' | 'OVERLAY' | 'SWAP_OVERLAY' | 'CLOSE_OVERLAY' | 'BACK' | 'NODE';
  destinationId?: string;
  navigation?: 'NAVIGATE' | 'SWAP' | 'OVERLAY';
  transition?: FigmaTransition;
  preserveScrollPosition?: boolean;
  overlayRelativePosition?: FigmaVector;
  url?: string;
  nodeId?: string;
}

export interface FigmaTransition {
  type: 'DISSOLVE' | 'SMART_ANIMATE' | 'SCROLL_ANIMATE' | 'SLIDE_IN' | 'SLIDE_OUT' | 'PUSH' | 'MOVE_IN' | 'MOVE_OUT';
  easing: FigmaEasing;
  duration: number;
  direction?: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM';
}

export interface FigmaEasing {
  type: 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT' | 'LINEAR' | 'EASE_IN_BACK' | 'EASE_OUT_BACK' | 'EASE_IN_AND_OUT_BACK' | 'CUSTOM_CUBIC_BEZIER';
  easingFunctionCubicBezier?: FigmaEasingFunctionBezier;
}

export interface FigmaEasingFunctionBezier {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} 