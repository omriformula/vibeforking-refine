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
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  PlayArrow as RunIcon,
  Refresh as RefreshIcon,
  Code as CodeIcon,
  Preview as PreviewIcon
} from '@mui/icons-material';
import { FigmaParser } from '../../lib/figma-to-code';
import { FigmaAnalyzer } from '../../lib/figma-to-code/debug/FigmaAnalyzer';

// Import all Figma examples
import loginFigmaData from '../figma/information for Cursor/trios/Login.figma.json';
import paymentFigmaData from '../figma/information for Cursor/trios/Payment.figma.json';
import buyerFigmaData from '../figma/information for Cursor/trios/Buyer.figma.json';
import overviewFigmaData from '../figma/information for Cursor/trios/Overview.figma.json';
import daccordFigmaData from '../figma/information for Cursor/trios/Daccord.figma.json';
import discoverFigmaData from '../figma/information for Cursor/trios/Discover.figma.json';
import mastercardFigmaData from '../figma/information for Cursor/trios/Mastercard.figma.json';

// Example configurations
const FIGMA_EXAMPLES = {
  login: { name: 'Login Form', data: loginFigmaData, description: 'Login/signup form with social authentication' },
  payment: { name: 'Payment Flow', data: paymentFigmaData, description: 'Credit card payment interface' },
  buyer: { name: 'E-commerce Buyer', data: buyerFigmaData, description: 'Product catalog and shopping interface' },
  overview: { name: 'Dashboard Overview', data: overviewFigmaData, description: 'Analytics dashboard with charts and data' },
  daccord: { name: 'Daccord Platform', data: daccordFigmaData, description: 'Complex business platform interface' },
  discover: { name: 'Content Discovery', data: discoverFigmaData, description: 'Content browsing and discovery interface' },
  mastercard: { name: 'Mastercard UI', data: mastercardFigmaData, description: 'Financial services interface' }
};

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
  const [selectedExample, setSelectedExample] = useState<keyof typeof FIGMA_EXAMPLES>('login');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, any>>({});

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const currentExample = FIGMA_EXAMPLES[selectedExample];
      console.log(`🔄 Starting Figma analysis and generation for: ${currentExample.name}...`);
      
      // First, analyze the raw Figma structure
      console.log('📊 Analyzing Figma structure...');
      const analyzer = new FigmaAnalyzer();
      const analysis = analyzer.analyze(currentExample.data as any);
      console.log('📊 Analysis completed:', analysis);
      setAnalysisResult(analysis);
      
      // Then run our parser
      console.log('⚙️ Running Figma parser...');
      console.log(`📂 ${currentExample.name} data loaded:`, Object.keys(currentExample.data));
      const parser = new FigmaParser();
      const result = await parser.parseToReact(currentExample.data as any);
      
      console.log('✅ Generation completed:', result);
      setGenerationResult(result);
      
      // Store result in test results
      setTestResults(prev => ({
        ...prev,
        [selectedExample]: {
          success: result.success,
          components: analysis?.totalNodes || 0,
          interactive: (analysis?.potentialButtons?.length || 0) + (analysis?.potentialInputs?.length || 0),
          generated: result.files?.length || 0,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
      
    } catch (err) {
      console.error('❌ Generation failed:', err);
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      
      // Store failure in test results
      setTestResults(prev => ({
        ...prev,
        [selectedExample]: {
          success: false,
          error: errorMsg,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } finally {
      setIsGenerating(false);
    }
  }, [selectedExample]);

  const handleTestAll = useCallback(async () => {
    setIsGenerating(true);
    setTestResults({});
    
    for (const [exampleKey, example] of Object.entries(FIGMA_EXAMPLES)) {
      try {
        console.log(`🔄 Testing ${example.name}...`);
        
        const analyzer = new FigmaAnalyzer();
        const analysis = analyzer.analyze(example.data as any);
        
        const parser = new FigmaParser();
        const result = await parser.parseToReact(example.data as any);
        
        setTestResults(prev => ({
          ...prev,
          [exampleKey]: {
            success: result.success,
            components: analysis?.totalNodes || 0,
            interactive: (analysis?.potentialButtons?.length || 0) + (analysis?.potentialInputs?.length || 0),
            generated: result.files?.length || 0,
            timestamp: new Date().toLocaleTimeString()
          }
        }));
        
        console.log(`✅ ${example.name} completed`);
        
      } catch (err) {
        console.error(`❌ ${example.name} failed:`, err);
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        
        setTestResults(prev => ({
          ...prev,
          [exampleKey]: {
            success: false,
            error: errorMsg,
            timestamp: new Date().toLocaleTimeString()
          }
        }));
      }
    }
    
    setIsGenerating(false);
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
          
          <FormControl sx={{ minWidth: 200, mr: 2 }}>
            <InputLabel sx={{ color: 'white' }}>Example</InputLabel>
            <Select
              value={selectedExample}
              onChange={(e) => {
                setSelectedExample(e.target.value as keyof typeof FIGMA_EXAMPLES);
                setGenerationResult(null);
                setAnalysisResult(null);
                setError(null);
              }}
              label="Example"
              sx={{ 
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '.MuiSvgIcon-root': { color: 'white' }
              }}
            >
              {Object.entries(FIGMA_EXAMPLES).map(([key, example]) => (
                <MenuItem key={key} value={key}>
                  <Box>
                    <Typography>{example.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {example.description}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button
            variant="contained"
            color="secondary"
            startIcon={<RunIcon />}
            onClick={handleGenerate}
            disabled={isGenerating}
            sx={{ mr: 1 }}
          >
            {isGenerating ? 'Generating...' : `Generate ${FIGMA_EXAMPLES[selectedExample].name}`}
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleTestAll}
            disabled={isGenerating}
            sx={{ mr: 2 }}
          >
            🚀 Test All 7 Examples
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<RefreshIcon />}
            onClick={() => {
              setGenerationResult(null);
              setAnalysisResult(null);
              setError(null);
              setTestResults({});
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

        {/* Test Results Summary */}
        {Object.keys(testResults).length > 0 && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🏆 Multi-Example Test Results
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(testResults).map(([key, result]) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Card 
                      variant="outlined"
                      sx={{ 
                        borderColor: result.success ? 'success.main' : 'error.main',
                        bgcolor: result.success ? 'success.50' : 'error.50'
                      }}
                    >
                      <CardContent sx={{ pb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {FIGMA_EXAMPLES[key as keyof typeof FIGMA_EXAMPLES].name}
                          </Typography>
                          <Chip 
                            label={result.success ? '✅ Success' : '❌ Failed'} 
                            color={result.success ? 'success' : 'error'}
                            size="small"
                            sx={{ ml: 'auto' }}
                          />
                        </Box>
                        
                        {result.success ? (
                          <Box sx={{ fontSize: '13px' }}>
                            <Typography variant="body2">
                              📊 <strong>{result.components}</strong> total nodes
                            </Typography>
                            <Typography variant="body2">
                              🎯 <strong>{result.interactive}</strong> interactive elements
                            </Typography>
                            <Typography variant="body2">
                              ⚡ <strong>{result.generated}</strong> files generated
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {result.timestamp}
                            </Typography>
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="body2" color="error">
                              <strong>Error:</strong> {result.error}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {result.timestamp}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              {/* Summary Stats */}
              <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  📈 Overall Success Rate
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Typography variant="body1">
                    <strong>
                      {Object.values(testResults).filter(r => r.success).length} / {Object.keys(testResults).length}
                    </strong> examples working
                  </Typography>
                  <Typography variant="body1">
                    <strong>
                      {Math.round((Object.values(testResults).filter(r => r.success).length / Object.keys(testResults).length) * 100)}%
                    </strong> success rate
                  </Typography>
                  <Typography variant="body1">
                    <strong>
                      {Object.values(testResults).reduce((sum, r) => sum + (r.interactive || 0), 0)}
                    </strong> total interactive elements found
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
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