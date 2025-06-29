import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Alert,
  LinearProgress,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import {
  PlayArrow as RunIcon,
  Refresh as RefreshIcon,
  Code as CodeIcon,
  Preview as PreviewIcon
} from '@mui/icons-material';
import { FigmaParser } from '../../lib/figma-to-code';
import { FigmaAnalyzer } from '../../lib/figma-to-code/debug/FigmaAnalyzer';

// Import the Login example for testing
import loginFigmaData from '../figma/information for Cursor/trios/Login.figma.json';

// Dynamic component renderer
const DynamicComponentRenderer = ({ generatedCode }: { generatedCode: string }) => {
  // For now, we'll show the code and a placeholder
  // Later we can enhance this to actually execute the JSX
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Generated Component Preview
      </Typography>
      <Paper 
        sx={{ 
          p: 3, 
          bgcolor: '#f8f9fa', 
          border: '2px dashed #dee2e6',
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography color="text.secondary" align="center">
          🎨 Component will render here<br/>
          <small>(Dynamic rendering coming soon)</small>
        </Typography>
      </Paper>
    </Box>
  );
};

const FigmaTestPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      console.log('🔄 Starting Figma analysis and generation...');
      
      // First, analyze the raw Figma structure
      console.log('📊 Analyzing Figma structure...');
      const analyzer = new FigmaAnalyzer();
      const analysis = analyzer.analyze(loginFigmaData as any);
      console.log('📊 Analysis completed:', analysis);
      setAnalysisResult(analysis);
      
      // Then run our parser
      console.log('⚙️ Running Figma parser...');
      console.log('📂 Login data loaded:', Object.keys(loginFigmaData));
      const parser = new FigmaParser();
      const result = await parser.parseToReact(loginFigmaData as any);
      
      console.log('✅ Generation completed:', result);
      setGenerationResult(result);
      
    } catch (err) {
      console.error('❌ Generation failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Auto-run test when page loads with special flag
  useEffect(() => {
    console.log('🧪 FigmaTest component mounted');
    const autoTest = new URLSearchParams(window.location.search).get('auto');
    if (autoTest === 'true') {
      console.log('🤖 AUTO-RUNNING FIGMA TEST...');
      setTimeout(() => {
        handleGenerate();
      }, 500);
    }
  }, [handleGenerate]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      {/* Header */}
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🧪 Figma-to-Code Test Lab
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<RunIcon />}
            onClick={handleGenerate}
            disabled={isGenerating}
            sx={{ mr: 2 }}
          >
            {isGenerating ? 'Generating...' : 'Generate from Login'}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<RefreshIcon />}
            onClick={() => {
              setGenerationResult(null);
              setAnalysisResult(null);
              setError(null);
            }}
          >
            Clear
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Status */}
        {isGenerating && (
          <Box sx={{ mb: 3 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Generating components from Figma design...
            </Alert>
            <LinearProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <strong>Generation Error:</strong> {error}
          </Alert>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🔍 Figma Structure Analysis
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Chip label={`${analysisResult.totalNodes} total nodes`} color="primary" />
                <Chip label={`${analysisResult.potentialButtons.length} potential buttons`} color="success" />
                <Chip label={`${analysisResult.potentialInputs.length} potential inputs`} color="info" />
                <Chip label={`${analysisResult.potentialText.length} potential text`} color="secondary" />
              </Box>
              
              <Paper sx={{ p: 2, bgcolor: '#f8f9fa', maxHeight: 300, overflow: 'auto' }}>
                <pre style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  lineHeight: '1.4',
                  whiteSpace: 'pre-wrap'
                }}>
                  {analysisResult.summary.join('\n')}
                </pre>
              </Paper>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {generationResult && (
          <Grid container spacing={3}>
            {/* Metadata Panel */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📊 Generation Stats
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip 
                      label={generationResult.success ? 'Success' : 'Failed'} 
                      color={generationResult.success ? 'success' : 'error'} 
                      size="small" 
                    />
                    <Typography variant="body2">
                      <strong>Files:</strong> {generationResult.files?.length || 0}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Components:</strong> {generationResult.metadata?.totalComponents || 0}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Time:</strong> {generationResult.metadata?.generationTimeMs || 0}ms
                    </Typography>
                    <Typography variant="body2">
                      <strong>Complexity:</strong> {generationResult.metadata?.estimatedComplexity || 'unknown'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Errors:</strong> {generationResult.errors?.length || 0}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Warnings:</strong> {generationResult.warnings?.length || 0}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Generated Files List */}
              {generationResult.files?.length > 0 && (
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      📁 Generated Files
                    </Typography>
                    {generationResult.files.map((file: any, index: number) => (
                      <Box key={index} sx={{ mb: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {file.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {file.type} • {file.content.length} chars
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Generated Code Display */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CodeIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Generated Code
                    </Typography>
                  </Box>
                  
                  {generationResult.files?.length > 0 ? (
                    <Box>
                      {generationResult.files.map((file: any, index: number) => (
                        <Box key={index} sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            📄 {file.name}
                          </Typography>
                          <Paper sx={{ p: 2, bgcolor: '#1e1e1e', borderRadius: 1, overflow: 'auto' }}>
                            <pre style={{ 
                              margin: 0,
                              color: '#d4d4d4',
                              fontFamily: 'Monaco, "Courier New", monospace',
                              fontSize: '13px',
                              lineHeight: '1.4',
                              whiteSpace: 'pre-wrap'
                            }}>
                              {file.content}
                            </pre>
                          </Paper>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Alert severity="info">
                      No code generated yet. Click "Generate from Login" to start.
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Component Preview */}
              {generationResult.files?.length > 0 && (
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PreviewIcon sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        Component Preview
                      </Typography>
                    </Box>
                    <DynamicComponentRenderer 
                      generatedCode={generationResult.files[0]?.content || ''} 
                    />
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        )}

        {/* Initial State */}
        {!generationResult && !analysisResult && !isGenerating && !error && (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h5" gutterBottom>
                🎯 Figma-to-Code Test Environment
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                This will first analyze the raw Figma structure to see what components exist,<br/>
                then run our parser to see what gets classified and generated.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<RunIcon />}
                onClick={handleGenerate}
              >
                Start Testing
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default FigmaTestPage; 