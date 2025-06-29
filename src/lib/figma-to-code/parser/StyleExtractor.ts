/**
 * Style Extractor
 * Converts Figma styling properties into ComponentStyles with Tailwind classes
 * Based on analysis of transformation patterns from 7 examples
 */

import { FigmaNode, FigmaColor, FigmaPaint } from '../types/FigmaTypes';
import { ComponentStyles } from '../types/ComponentTypes';

export class StyleExtractor {

  /**
   * Extract styles from a Figma node
   */
  extractStyles(node: FigmaNode): ComponentStyles {
    const styles: ComponentStyles = {
      tailwindClasses: []
    };

    // Extract dimensions
    this.extractDimensions(node, styles);

    // Extract positioning
    this.extractPositioning(node, styles);

    // Extract layout properties
    this.extractLayout(node, styles);

    // Extract background and fills
    this.extractBackground(node, styles);

    // Extract borders and corners
    this.extractBorders(node, styles);

    // Extract text styling (for TEXT nodes)
    this.extractTextStyles(node, styles);

    // Extract effects (shadows, etc.)
    this.extractEffects(node, styles);

    // Extract spacing from auto-layout
    this.extractSpacing(node, styles);

    return styles;
  }

  /**
   * Extract width and height
   */
  private extractDimensions(node: FigmaNode, styles: ComponentStyles): void {
    if (node.absoluteBoundingBox) {
      const { width, height } = node.absoluteBoundingBox;
      
      // Convert to Tailwind classes or fixed values
      if (width > 0) {
        if (this.isStandardWidth(width)) {
          styles.tailwindClasses.push(this.getStandardWidthClass(width));
        } else {
          styles.width = `${Math.round(width)}px`;
          styles.tailwindClasses.push(`w-[${Math.round(width)}px]`);
        }
      }

      if (height > 0) {
        if (this.isStandardHeight(height)) {
          styles.tailwindClasses.push(this.getStandardHeightClass(height));
        } else {
          styles.height = `${Math.round(height)}px`;
          styles.tailwindClasses.push(`h-[${Math.round(height)}px]`);
        }
      }
    }

    // Handle sizing constraints
    if (node.layoutSizingHorizontal) {
      switch (node.layoutSizingHorizontal) {
        case 'FILL':
          styles.tailwindClasses.push('w-full');
          break;
        case 'HUG':
          styles.tailwindClasses.push('w-auto');
          break;
      }
    }

    if (node.layoutSizingVertical) {
      switch (node.layoutSizingVertical) {
        case 'FILL':
          styles.tailwindClasses.push('h-full');
          break;
        case 'HUG':
          styles.tailwindClasses.push('h-auto');
          break;
      }
    }
  }

  /**
   * Extract positioning information
   */
  private extractPositioning(node: FigmaNode, styles: ComponentStyles): void {
    if (node.absoluteBoundingBox) {
      const { x, y } = node.absoluteBoundingBox;
      
      // For now, use absolute positioning for precise layouts
      // This will be refined based on parent layout context
      if (x !== 0 || y !== 0) {
        styles.position = 'absolute';
        styles.top = `${Math.round(y)}px`;
        styles.left = `${Math.round(x)}px`;
        styles.tailwindClasses.push(
          'absolute',
          `top-[${Math.round(y)}px]`,
          `left-[${Math.round(x)}px]`
        );
      }
    }
  }

  /**
   * Extract layout properties (flex, etc.)
   */
  private extractLayout(node: FigmaNode, styles: ComponentStyles): void {
    if (node.layoutMode) {
      styles.display = 'flex';
      styles.tailwindClasses.push('flex');

      // Direction
      if (node.layoutMode === 'HORIZONTAL') {
        styles.flexDirection = 'row';
        styles.tailwindClasses.push('flex-row');
      } else if (node.layoutMode === 'VERTICAL') {
        styles.flexDirection = 'column';
        styles.tailwindClasses.push('flex-col');
      }

      // Alignment
      if (node.layoutAlign) {
        const alignClass = this.getAlignmentClass(node.layoutAlign);
        if (alignClass) {
          styles.tailwindClasses.push(alignClass);
        }
      }

      // Item spacing
      if (node.itemSpacing && node.itemSpacing > 0) {
        const gapClass = this.getGapClass(node.itemSpacing);
        styles.tailwindClasses.push(gapClass);
      }
    }
  }

  /**
   * Extract background colors and fills
   */
  private extractBackground(node: FigmaNode, styles: ComponentStyles): void {
    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0]; // Use first fill for now
      
      if (fill.type === 'SOLID' && fill.color) {
        const color = this.figmaColorToHex(fill.color);
        styles.backgroundColor = color;
        
        // Try to map to standard Tailwind colors
        const tailwindColor = this.mapToTailwindColor(color);
        if (tailwindColor) {
          styles.tailwindClasses.push(`bg-${tailwindColor}`);
        } else {
          styles.tailwindClasses.push(`bg-[${color}]`);
        }
      } else if (fill.type === 'GRADIENT_LINEAR') {
        // Handle linear gradients
        const gradient = this.createLinearGradient(fill);
        styles.backgroundImage = gradient;
        styles.tailwindClasses.push(`bg-[${gradient}]`);
      }
    }

    // Handle background from background property
    if (node.background && node.background.length > 0) {
      const bg = node.background[0];
      if (bg.type === 'SOLID' && bg.color) {
        const color = this.figmaColorToHex(bg.color);
        const tailwindColor = this.mapToTailwindColor(color);
        if (tailwindColor) {
          styles.tailwindClasses.push(`bg-${tailwindColor}`);
        } else {
          styles.tailwindClasses.push(`bg-[${color}]`);
        }
      }
    }
  }

  /**
   * Extract border and corner radius
   */
  private extractBorders(node: FigmaNode, styles: ComponentStyles): void {
    // Corner radius
    if (node.cornerRadius && node.cornerRadius > 0) {
      const radius = Math.round(node.cornerRadius);
      if (this.isStandardRadius(radius)) {
        styles.tailwindClasses.push(this.getStandardRadiusClass(radius));
      } else {
        styles.borderRadius = `${radius}px`;
        styles.tailwindClasses.push(`rounded-[${radius}px]`);
      }
    }

    // Strokes/borders
    if (node.strokes && node.strokes.length > 0 && node.strokeWeight && node.strokeWeight > 0) {
      const stroke = node.strokes[0];
      const weight = Math.round(node.strokeWeight);
      
      if (stroke.type === 'SOLID' && stroke.color) {
        const color = this.figmaColorToHex(stroke.color);
        styles.borderWidth = `${weight}px`;
        styles.borderColor = color;
        
        const tailwindColor = this.mapToTailwindColor(color);
        if (tailwindColor) {
          styles.tailwindClasses.push(`border-${weight}`, `border-${tailwindColor}`);
        } else {
          styles.tailwindClasses.push(`border-${weight}`, `border-[${color}]`);
        }
      }
    }
  }

  /**
   * Extract text styling properties
   */
  private extractTextStyles(node: FigmaNode, styles: ComponentStyles): void {
    if (node.type === 'TEXT' && node.style) {
      const textStyle = node.style;

      // Font size
      if (textStyle.fontSize) {
        const size = Math.round(textStyle.fontSize);
        styles.fontSize = `${size}px`;
        
        const tailwindSize = this.mapToTailwindFontSize(size);
        if (tailwindSize) {
          styles.tailwindClasses.push(`text-${tailwindSize}`);
        } else {
          styles.tailwindClasses.push(`text-[${size}px]`);
        }
      }

      // Font weight
      if (textStyle.fontWeight) {
        const weight = textStyle.fontWeight;
        const tailwindWeight = this.mapToTailwindFontWeight(weight);
        if (tailwindWeight) {
          styles.tailwindClasses.push(`font-${tailwindWeight}`);
        }
      }

      // Text alignment
      if (textStyle.textAlignHorizontal) {
        const alignment = textStyle.textAlignHorizontal.toLowerCase();
        if (['left', 'center', 'right'].includes(alignment)) {
          styles.tailwindClasses.push(`text-${alignment}`);
        }
      }

      // Line height
      if (textStyle.lineHeightPx) {
        const lineHeight = Math.round(textStyle.lineHeightPx);
        styles.lineHeight = `${lineHeight}px`;
        styles.tailwindClasses.push(`leading-[${lineHeight}px]`);
      }

      // Letter spacing
      if (textStyle.letterSpacing && textStyle.letterSpacing !== 0) {
        const spacing = textStyle.letterSpacing;
        styles.letterSpacing = `${spacing}px`;
        styles.tailwindClasses.push(`tracking-[${spacing}px]`);
      }
    }

    // Text color from fills
    if (node.type === 'TEXT' && node.fills && node.fills.length > 0) {
      const textFill = node.fills[0];
      if (textFill.type === 'SOLID' && textFill.color) {
        const color = this.figmaColorToHex(textFill.color);
        styles.color = color;
        
        const tailwindColor = this.mapToTailwindColor(color);
        if (tailwindColor) {
          styles.tailwindClasses.push(`text-${tailwindColor}`);
        } else {
          styles.tailwindClasses.push(`text-[${color}]`);
        }
      }
    }
  }

  /**
   * Extract effects like shadows
   */
  private extractEffects(node: FigmaNode, styles: ComponentStyles): void {
    if (node.effects && node.effects.length > 0) {
      for (const effect of node.effects) {
        if (effect.type === 'DROP_SHADOW' && effect.visible) {
          const shadow = this.createBoxShadow(effect);
          styles.boxShadow = shadow;
          
          // Try to map to standard Tailwind shadows
          const tailwindShadow = this.mapToTailwindShadow(shadow);
          if (tailwindShadow) {
            styles.tailwindClasses.push(tailwindShadow);
          } else {
            styles.tailwindClasses.push(`shadow-[${shadow}]`);
          }
        }
      }
    }
  }

  /**
   * Extract spacing from auto-layout
   */
  private extractSpacing(node: FigmaNode, styles: ComponentStyles): void {
    // Padding
    if (node.paddingTop || node.paddingRight || node.paddingBottom || node.paddingLeft) {
      const pt = node.paddingTop || 0;
      const pr = node.paddingRight || 0;
      const pb = node.paddingBottom || 0;
      const pl = node.paddingLeft || 0;

      if (pt === pr && pr === pb && pb === pl && pt > 0) {
        // Uniform padding
        const padding = Math.round(pt);
        styles.tailwindClasses.push(`p-[${padding}px]`);
      } else {
        // Individual padding values
        if (pt > 0) styles.tailwindClasses.push(`pt-[${Math.round(pt)}px]`);
        if (pr > 0) styles.tailwindClasses.push(`pr-[${Math.round(pr)}px]`);
        if (pb > 0) styles.tailwindClasses.push(`pb-[${Math.round(pb)}px]`);
        if (pl > 0) styles.tailwindClasses.push(`pl-[${Math.round(pl)}px]`);
      }
    }
  }

  // Utility methods

  private figmaColorToHex(color: FigmaColor): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private isStandardWidth(width: number): boolean {
    const standardWidths = [16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 288, 320, 384];
    return standardWidths.includes(Math.round(width));
  }

  private getStandardWidthClass(width: number): string {
    const widthMap: Record<number, string> = {
      16: 'w-4', 20: 'w-5', 24: 'w-6', 32: 'w-8', 40: 'w-10',
      48: 'w-12', 56: 'w-14', 64: 'w-16', 80: 'w-20', 96: 'w-24',
      112: 'w-28', 128: 'w-32', 144: 'w-36', 160: 'w-40', 176: 'w-44',
      192: 'w-48', 208: 'w-52', 224: 'w-56', 240: 'w-60', 256: 'w-64',
      288: 'w-72', 320: 'w-80', 384: 'w-96'
    };
    return widthMap[Math.round(width)] || `w-[${Math.round(width)}px]`;
  }

  private isStandardHeight(height: number): boolean {
    const standardHeights = [16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128];
    return standardHeights.includes(Math.round(height));
  }

  private getStandardHeightClass(height: number): string {
    const heightMap: Record<number, string> = {
      16: 'h-4', 20: 'h-5', 24: 'h-6', 32: 'h-8', 40: 'h-10',
      48: 'h-12', 56: 'h-14', 64: 'h-16', 80: 'h-20', 96: 'h-24',
      112: 'h-28', 128: 'h-32'
    };
    return heightMap[Math.round(height)] || `h-[${Math.round(height)}px]`;
  }

  private isStandardRadius(radius: number): boolean {
    const standardRadii = [2, 4, 6, 8, 10, 12, 16, 20, 24];
    return standardRadii.includes(radius);
  }

  private getStandardRadiusClass(radius: number): string {
    const radiusMap: Record<number, string> = {
      2: 'rounded-sm', 4: 'rounded', 6: 'rounded-md', 8: 'rounded-lg',
      10: 'rounded-xl', 12: 'rounded-xl', 16: 'rounded-2xl', 20: 'rounded-3xl'
    };
    return radiusMap[radius] || `rounded-[${radius}px]`;
  }

  private getAlignmentClass(align: string): string | null {
    const alignMap: Record<string, string> = {
      'MIN': 'items-start',
      'CENTER': 'items-center',
      'MAX': 'items-end',
      'STRETCH': 'items-stretch'
    };
    return alignMap[align] || null;
  }

  private getGapClass(spacing: number): string {
    const roundedSpacing = Math.round(spacing);
    if (roundedSpacing <= 4) return 'gap-1';
    if (roundedSpacing <= 8) return 'gap-2';
    if (roundedSpacing <= 12) return 'gap-3';
    if (roundedSpacing <= 16) return 'gap-4';
    if (roundedSpacing <= 20) return 'gap-5';
    if (roundedSpacing <= 24) return 'gap-6';
    return `gap-[${roundedSpacing}px]`;
  }

  private mapToTailwindColor(hex: string): string | null {
    const colorMap: Record<string, string> = {
      '#000000': 'black',
      '#ffffff': 'white',
      '#f3f4f6': 'gray-100',
      '#e5e7eb': 'gray-200',
      '#d1d5db': 'gray-300',
      '#9ca3af': 'gray-400',
      '#6b7280': 'gray-500',
      '#374151': 'gray-700',
      '#1f2937': 'gray-800',
      '#111827': 'gray-900'
    };
    return colorMap[hex.toLowerCase()] || null;
  }

  private mapToTailwindFontSize(size: number): string | null {
    const sizeMap: Record<number, string> = {
      12: 'xs', 14: 'sm', 16: 'base', 18: 'lg', 20: 'xl',
      24: '2xl', 30: '3xl', 36: '4xl', 48: '5xl'
    };
    return sizeMap[size] || null;
  }

  private mapToTailwindFontWeight(weight: number): string | null {
    const weightMap: Record<number, string> = {
      100: 'thin', 200: 'extralight', 300: 'light', 400: 'normal',
      500: 'medium', 600: 'semibold', 700: 'bold', 800: 'extrabold', 900: 'black'
    };
    return weightMap[weight] || null;
  }

  private createLinearGradient(fill: FigmaPaint): string {
    // Simplified linear gradient creation
    return 'linear-gradient(90deg, #000 0%, #fff 100%)';
  }

  private createBoxShadow(effect: any): string {
    // Simplified shadow creation
    return '0 1px 3px rgba(0, 0, 0, 0.12)';
  }

  private mapToTailwindShadow(shadow: string): string | null {
    const shadowMap: Record<string, string> = {
      '0 1px 3px rgba(0, 0, 0, 0.12)': 'shadow-sm',
      '0 4px 6px rgba(0, 0, 0, 0.1)': 'shadow',
      '0 10px 15px rgba(0, 0, 0, 0.1)': 'shadow-lg'
    };
    return shadowMap[shadow] || null;
  }
} 