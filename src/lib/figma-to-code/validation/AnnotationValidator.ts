// Annotation Validation System
// Compares manual annotations with parser results for accuracy measurement

export interface ManualAnnotations {
  exampleName: string;
  annotatedCounts: {
    buttons: number;      // Red annotations
    inputs: number;       // Blue annotations  
    navigation: number;   // Green annotations
    interactiveCards: number; // Yellow annotations
    dropdowns: number;    // Purple annotations
    images: number;       // Orange annotations
    calendars: number;    // Cyan annotations
    nonInteractiveCards: number; // Gray annotations  
    text: number;         // Pink annotations
    sliders: number;      // Brown annotations
    graphCards: number;   // Lime annotations
    tabs: number;         // Teal annotations
    checkboxes: number;   // Coral annotations
  };
  totalAnnotated: number;
  notes?: string;
}

export interface ParserResults {
  exampleName: string;
  detectedCounts: {
    BUTTON: number;
    INPUT: number;
    TEXT: number;
    CONTAINER: number;
    UNKNOWN: number;
  };
  totalDetected: number;
  interactiveDetected: number; // BUTTON + INPUT + meaningful components
}

export interface ValidationReport {
  exampleName: string;
  annotations: ManualAnnotations;
  parserResults: ParserResults;
  accuracy: {
    overallAccuracy: number; // (detected interactive / annotated total) * 100
    precisionScore: number;  // How many detected are actually relevant
    recallScore: number;     // How many annotated were detected
    f1Score: number;         // Harmonic mean of precision and recall
  };
  gaps: {
    overDetected: number;    // Parser found more than annotated
    underDetected: number;   // Parser found less than annotated
    missedComponents: string[]; // Types likely missed
    falsePositives: string[];   // Types likely over-detected
  };
  recommendations: string[];
}

export class AnnotationValidator {
  // Manual annotation data from user's screenshots
  private static MANUAL_ANNOTATIONS: ManualAnnotations[] = [
    {
      exampleName: "Login Form",
      annotatedCounts: {
        buttons: 7,      // Log in, Google, Microsoft, Forgot password, Remember me, visibility toggle, possibly more
        inputs: 2,       // Email, Password fields
        navigation: 0,   // No green nav elements
        interactiveCards: 0, // No yellow cards
        dropdowns: 0,    // No purple dropdowns
        images: 1,       // Logo/branding image
        calendars: 0,    // No cyan calendars
        nonInteractiveCards: 0, // No gray containers
        text: 8,         // Various pink text labels (Email, Password, Remember me, etc.)
        sliders: 0,      // No brown sliders
        graphCards: 0,   // No lime graph cards
        tabs: 2,         // Log in / Sign up tabs (teal)
        checkboxes: 1,   // Remember me checkbox (coral)
      },
      totalAnnotated: 21,
      notes: "Login form with auth buttons, input fields, and tabs"
    },
    {
      exampleName: "Payment Flow", 
      annotatedCounts: {
        buttons: 4,      // Back button, step indicators, Confirm button
        inputs: 0,       // No input fields visible
        navigation: 0,   // No green navigation
        interactiveCards: 1, // Payment preview card (yellow)
        dropdowns: 0,    // No purple dropdowns
        images: 1,       // Card visualization (orange)
        calendars: 1,    // Large calendar view (cyan)
        nonInteractiveCards: 0, // No gray containers
        text: 6,         // Various labels and amounts (pink)
        sliders: 0,      // No brown sliders
        graphCards: 0,   // No lime graph cards
        tabs: 3,         // Step indicators/tabs (teal)
        checkboxes: 0,   // No coral checkboxes
      },
      totalAnnotated: 16,
      notes: "Payment flow with calendar selection and card preview"
    },
    {
      exampleName: "E-commerce Buyer",
      annotatedCounts: {
        buttons: 15,     // Search, filter buttons, hearts, nav icons, category buttons
        inputs: 0,       // No blue input fields
        navigation: 0,   // No green navigation
        interactiveCards: 3, // Product cards (yellow)
        dropdowns: 0,    // No purple dropdowns
        images: 3,       // Product images (orange)
        calendars: 0,    // No cyan calendars
        nonInteractiveCards: 0, // No gray containers
        text: 8,         // Product names, prices, descriptions (pink)
        sliders: 0,      // No brown sliders
        graphCards: 0,   // No lime graph cards
        tabs: 0,         // No teal tabs visible
        checkboxes: 0,   // No coral checkboxes
      },
      totalAnnotated: 29,
      notes: "Mobile e-commerce product discovery interface"
    },
    {
      exampleName: "Dashboard Overview",
      annotatedCounts: {
        buttons: 25,     // Many nav elements, notification icons, action buttons
        inputs: 1,       // Search bar (blue)
        navigation: 8,   // Left sidebar menu items (green)
        interactiveCards: 6, // Various dashboard cards and metrics (yellow)
        dropdowns: 2,    // Some dropdown elements (purple)
        images: 8,       // User avatars and profile images (orange)
        calendars: 0,    // No cyan calendars
        nonInteractiveCards: 4, // Data cards/containers (gray)
        text: 20,        // Labels, numbers, text content (pink)
        sliders: 0,      // No brown sliders
        graphCards: 3,   // Chart/graph cards (lime)
        tabs: 3,         // Tab navigation elements (teal)
        checkboxes: 0,   // No coral checkboxes
      },
      totalAnnotated: 80,
      notes: "Complex analytics dashboard with rich interactive elements"
    },
    {
      exampleName: "Daccord Platform",
      annotatedCounts: {
        buttons: 18,     // Navigation menu, "See all" buttons, user interactions
        inputs: 1,       // Search bar at top (blue)
        navigation: 7,   // Left sidebar navigation items (green)
        interactiveCards: 6, // Community cards, user profile cards (yellow)
        dropdowns: 0,    // No purple dropdowns visible
        images: 12,      // User avatars, community thumbnails (orange)
        calendars: 0,    // No cyan calendars
        nonInteractiveCards: 2, // Background containers (gray)
        text: 15,        // Various labels and content (pink)
        sliders: 0,      // No brown sliders
        graphCards: 0,   // No lime graph cards
        tabs: 0,         // No teal tabs visible
        checkboxes: 0,   // No coral checkboxes
      },
      totalAnnotated: 61,
      notes: "Social platform with community features and rich media"
    },
    {
      exampleName: "Content Discovery",
      annotatedCounts: {
        buttons: 12,     // Search, filter buttons, hearts, bottom navigation
        inputs: 0,       // No blue inputs visible
        navigation: 0,   // No green navigation
        interactiveCards: 3, // Product/content cards (yellow)
        dropdowns: 0,    // No purple dropdowns
        images: 3,       // Product/content images (orange)
        calendars: 0,    // No cyan calendars
        nonInteractiveCards: 0, // No gray containers
        text: 6,         // Product info and labels (pink)
        sliders: 0,      // No brown sliders
        graphCards: 0,   // No lime graph cards
        tabs: 0,         // No teal tabs
        checkboxes: 0,   // No coral checkboxes
      },
      totalAnnotated: 24,
      notes: "Mobile content discovery and product browsing"
    },
    {
      exampleName: "Mastercard UI",
      annotatedCounts: {
        buttons: 6,      // Back, payment method cards, ADD NEW, PAY & CONFIRM
        inputs: 0,       // No blue inputs
        navigation: 0,   // No green navigation
        interactiveCards: 0, // No yellow cards
        dropdowns: 0,    // No purple dropdowns
        images: 1,       // Card visualization (orange)
        calendars: 0,    // No cyan calendars
        nonInteractiveCards: 1, // Card container (gray)
        text: 4,         // Labels and amounts (pink)
        sliders: 0,      // No brown sliders
        graphCards: 0,   // No lime graph cards
        tabs: 0,         // No teal tabs
        checkboxes: 0,   // No coral checkboxes
      },
      totalAnnotated: 12,
      notes: "Clean payment method selection interface"
    }
  ];

  static validateExample(exampleName: string, parserResults: ParserResults): ValidationReport {
    const annotations = this.MANUAL_ANNOTATIONS.find(a => a.exampleName === exampleName);
    
    if (!annotations) {
      throw new Error(`No manual annotations found for example: ${exampleName}`);
    }

    // Calculate total annotated (sum of all interactive components)
    const totalAnnotated = Object.values(annotations.annotatedCounts).reduce((sum, count) => sum + count, 0);
    annotations.totalAnnotated = totalAnnotated;

    // Calculate accuracy metrics
    const interactiveDetected = parserResults.detectedCounts.BUTTON + parserResults.detectedCounts.INPUT;
    const overallAccuracy = totalAnnotated > 0 ? (interactiveDetected / totalAnnotated) * 100 : 0;
    
    // Precision: Of what we detected, how much was relevant?
    const precisionScore = parserResults.interactiveDetected > 0 ? 
      (Math.min(interactiveDetected, totalAnnotated) / parserResults.interactiveDetected) * 100 : 0;
    
    // Recall: Of what was annotated, how much did we detect?
    const recallScore = totalAnnotated > 0 ? (interactiveDetected / totalAnnotated) * 100 : 0;
    
    // F1 Score: Harmonic mean of precision and recall
    const f1Score = (precisionScore + recallScore) > 0 ? 
      (2 * precisionScore * recallScore) / (precisionScore + recallScore) : 0;

    // Identify gaps
    const overDetected = Math.max(0, interactiveDetected - totalAnnotated);
    const underDetected = Math.max(0, totalAnnotated - interactiveDetected);
    
    const missedComponents = [];
    const falsePositives = [];
    
    if (annotations.annotatedCounts.buttons > parserResults.detectedCounts.BUTTON) {
      missedComponents.push(`Buttons (${annotations.annotatedCounts.buttons - parserResults.detectedCounts.BUTTON} missed)`);
    }
    if (annotations.annotatedCounts.inputs > parserResults.detectedCounts.INPUT) {
      missedComponents.push(`Inputs (${annotations.annotatedCounts.inputs - parserResults.detectedCounts.INPUT} missed)`);
    }
    
    if (parserResults.detectedCounts.BUTTON > annotations.annotatedCounts.buttons) {
      falsePositives.push(`Buttons (${parserResults.detectedCounts.BUTTON - annotations.annotatedCounts.buttons} extra)`);
    }
    if (parserResults.detectedCounts.INPUT > annotations.annotatedCounts.inputs) {
      falsePositives.push(`Inputs (${parserResults.detectedCounts.INPUT - annotations.annotatedCounts.inputs} extra)`);
    }

    // Generate recommendations
    const recommendations = [];
    if (recallScore < 70) {
      recommendations.push("Low recall - consider relaxing classification thresholds");
    }
    if (precisionScore < 70) {
      recommendations.push("Low precision - consider tightening classification rules");
    }
    if (parserResults.detectedCounts.UNKNOWN > totalAnnotated) {
      recommendations.push("Too many UNKNOWN components - improve classification coverage");
    }
    if (overDetected > underDetected * 2) {
      recommendations.push("Significant over-detection - review confidence thresholds");
    }

    return {
      exampleName,
      annotations,
      parserResults,
      accuracy: {
        overallAccuracy,
        precisionScore,
        recallScore,
        f1Score
      },
      gaps: {
        overDetected,
        underDetected,
        missedComponents,
        falsePositives
      },
      recommendations
    };
  }

  static validateAllExamples(allParserResults: ParserResults[]): ValidationReport[] {
    return allParserResults.map(result => this.validateExample(result.exampleName, result));
  }

  static generateSummaryReport(reports: ValidationReport[]): {
    overallAccuracy: number;
    averageF1Score: number;
    totalAnnotated: number;
    totalDetected: number;
    bestPerforming: string;
    worstPerforming: string;
    commonIssues: string[];
    priorityRecommendations: string[];
  } {
    const totalAnnotated = reports.reduce((sum, r) => sum + r.annotations.totalAnnotated, 0);
    const totalDetected = reports.reduce((sum, r) => sum + r.parserResults.interactiveDetected, 0);
    const averageF1Score = reports.reduce((sum, r) => sum + r.accuracy.f1Score, 0) / reports.length;
    const overallAccuracy = totalAnnotated > 0 ? (totalDetected / totalAnnotated) * 100 : 0;

    const sortedByF1 = [...reports].sort((a, b) => b.accuracy.f1Score - a.accuracy.f1Score);
    const bestPerforming = sortedByF1[0]?.exampleName || "None";
    const worstPerforming = sortedByF1[sortedByF1.length - 1]?.exampleName || "None";

    // Aggregate common issues
    const allRecommendations = reports.flatMap(r => r.recommendations);
    const commonIssues = [...new Set(allRecommendations)];

    const priorityRecommendations = [];
    if (averageF1Score < 70) {
      priorityRecommendations.push("Overall detection accuracy needs improvement");
    }
    if (reports.every(r => r.gaps.overDetected > r.gaps.underDetected)) {
      priorityRecommendations.push("Consistent over-detection across all examples");
    }
    if (reports.some(r => r.accuracy.recallScore < 50)) {
      priorityRecommendations.push("Some examples have very low recall - missing too many components");
    }

    return {
      overallAccuracy,
      averageF1Score,
      totalAnnotated,
      totalDetected,
      bestPerforming,
      worstPerforming,
      commonIssues,
      priorityRecommendations
    };
  }
} 