import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Alert,
  LinearProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Avatar,
  Chip
} from '@mui/material';
import {
  Link as LinkIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Folder as FolderIcon,
  Image as ImageIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import LiveCodePreview from '../../components/LiveCodePreview';
import FigmaParser, { GenerationCallbacks, GenerationProgress, FigmaNode, FigmaFile } from '../../lib/figma-to-code';

interface FigmaFileInfo {
  key: string;
  name: string;
  thumbnail_url?: string;
  last_modified: string;
}

const FigmaIntegration = () => {
  const [figmaToken, setFigmaToken] = useState('figd_DpCLNHWBW36aPFlobWTuk6JcE1g0-APGK2JwyNEi');
  const [figmaFileUrl, setFigmaFileUrl] = useState('CbS1cPHwdvmOJfPJFzKodU');
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [figmaFiles, setFigmaFiles] = useState<FigmaFileInfo[]>([]);
  const [selectedFile, setSelectedFile] = useState<FigmaFileInfo | null>(null);
  const [figmaNodes, setFigmaNodes] = useState<FigmaNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<FigmaNode | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [rawJsonResponse, setRawJsonResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress | null>(null);

  const handleConnect = async () => {
    if (!figmaToken.trim()) {
      setError('Please enter your Figma Personal Access Token');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Test the token by fetching user info (this is a valid endpoint to test authentication)
      const response = await fetch('https://api.figma.com/v1/me', {
        headers: {
          'X-Figma-Token': figmaToken
        }
      });

      if (!response.ok) {
        throw new Error('Invalid Figma token or API error');
      }

      const data = await response.json();
      console.log('Connected user:', data);
      
      // Clear the recent files since we can't fetch them without team/project info
      setFigmaFiles([]);
      setConnectDialogOpen(false);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Figma');
    } finally {
      setIsLoading(false);
    }
  };

  const extractFileKeyFromUrl = (url: string): string | null => {
    const match = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
    console.log('url', url);
    console.log('match', match);
    return match ? match[1] : null;
  };



  const handleLoadFromUrl = async () => {
    if (!figmaFileUrl.trim() || !figmaToken) return;

    const fileKey = figmaFileUrl;
    console.log('fileKey', fileKey);
    if (!fileKey) {
      setError('Invalid Figma file URL. Please use a valid Figma file URL.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
        headers: {
          'X-Figma-Token': figmaToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load Figma file from URL');
      }

      const data = await response.json();
      setSelectedFile({
        key: fileKey,
        name: data.name || 'Untitled',
        last_modified: data.lastModified || new Date().toISOString()
      });
      setFigmaNodes(data.document?.children || []);
      setRawJsonResponse(data); // Store the complete raw response
      setFigmaFileUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Figma file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCode = async (node: FigmaNode) => {
    if (!figmaToken || !selectedFile || !rawJsonResponse) return;

    setIsLoading(true);
    setError('');
    setSelectedNode(node);
    setGenerationProgress(null);

    try {
      // Create generation callbacks for progress tracking
      const callbacks: GenerationCallbacks = {
        onProgress: (progress: GenerationProgress) => {
          setGenerationProgress(progress);
        },
        onError: (error) => {
          console.error('Generation error:', error);
          setError(error.message);
        },
        onWarning: (warning) => {
          console.warn('Generation warning:', warning);
        }
      };

      // Initialize the Figma parser with our callbacks
      const parser = new FigmaParser({
        framework: 'react',
        styleFramework: 'tailwind',
        componentLibrary: 'shadcn-ui',
        typescript: true,
        includeComments: true,
        includeDataModelIds: true,
        singleFile: true,
        componentNaming: 'PascalCase',
        fileNaming: 'PascalCase'
      }, callbacks);

      // Parse the selected node using our complete figma-to-code system
      const result = await parser.parseToReact(node);

      if (result.success && result.files.length > 0) {
        // Use the generated React component code
        setGeneratedCode(result.files[0].content);
        
        // Log the complete result for debugging
        console.log('🎉 Generation successful!', result);
        console.log('📊 Metadata:', result.metadata);
        console.log('⏱️ Generation time:', result.metadata.generationTimeMs + 'ms');
        console.log('🧩 Components found:', result.metadata.totalComponents);
        
        if (result.warnings.length > 0) {
          console.warn('⚠️ Generation warnings:', result.warnings);
        }
      } else {
        throw new Error(result.errors[0]?.message || 'Code generation failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate code');
      console.error('Generation failed:', err);
    } finally {
      setIsLoading(false);
      setGenerationProgress(null);
    }
  };

  const handleCopyJson = async () => {
    if (!rawJsonResponse) return;
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(rawJsonResponse, null, 2));
      // You could add a toast notification here if you want
      console.log('JSON copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy JSON:', err);
    }
  };

  const handleDownloadJson = () => {
    if (!rawJsonResponse || !selectedFile) return;
    
    const jsonString = JSON.stringify(rawJsonResponse, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedFile.name.replace(/[^a-zA-Z0-9]/g, '_')}_figma_data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderNodeTree = (nodes: FigmaNode[], depth = 0) => {
    return nodes.map((node) => (
      <Box key={node.id} sx={{ ml: depth * 2 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleGenerateCode(node)}>
            <Avatar sx={{ mr: 2, bgcolor: 'secondary.main', width: 32, height: 32 }}>
              <ImageIcon fontSize="small" />
            </Avatar>
            <ListItemText
              primary={node.name}
              secondary={`${node.type} • ${node.id}`}
            />
            <Chip 
              label="Generate"
              size="small"
              color="primary"
              variant="outlined"
            />
          </ListItemButton>
        </ListItem>
        {node.children && renderNodeTree(node.children, depth + 1)}
      </Box>
    ));
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Figma to Code Generator
          </Typography>
          <Button
            variant="contained"
            startIcon={<LinkIcon />}
            onClick={() => setConnectDialogOpen(true)}
            sx={{ mr: 2 }}
          >
            {figmaToken ? 'Connected' : 'Connect Figma'}
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Figma Files Sidebar */}
        <Box sx={{ width: 350, borderRight: 1, borderColor: 'divider', overflow: 'auto' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Figma Files
            </Typography>
            
            {/* File URL Input */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="Figma File URL"
                value={figmaFileUrl}
                onChange={(e) => setFigmaFileUrl(e.target.value)}
                placeholder="https://www.figma.com/file/..."
                sx={{ mb: 1 }}
              />
              <Button
                fullWidth
                variant="outlined"
                onClick={handleLoadFromUrl}
                disabled={!figmaToken || !figmaFileUrl.trim() || isLoading}
              >
                Load from URL
              </Button>
            </Box>

            {/* Recent Files Info */}
            {figmaToken && (
              <Alert severity="info" sx={{ mt: 2 }}>
                To access your recent files, you would need to provide team or project IDs. 
                For now, use the "Load from URL" option above with any Figma file URL.
              </Alert>
            )}

            {!figmaToken && (
              <Alert severity="info">
                Connect your Figma account to view your files and generate code from designs.
              </Alert>
            )}
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {!selectedFile ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6" color="text.secondary">
                Select a Figma file to start generating code
              </Typography>
            </Box>
          ) : (
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {selectedFile.name}
              </Typography>

              <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
                <Tab label="Design Nodes" icon={<ImageIcon />} />
                {rawJsonResponse && <Tab label="Raw JSON" icon={<CodeIcon />} />}
                {generatedCode && <Tab label="Live Preview" icon={<PreviewIcon />} />}
                {generatedCode && <Tab label="Generated Code" icon={<CodeIcon />} />}
              </Tabs>

              {isLoading && <LinearProgress sx={{ mb: 2 }} />}
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {currentTab === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Design Elements
                  </Typography>
                  {figmaNodes.length > 0 ? (
                    <List>
                      {renderNodeTree(figmaNodes)}
                    </List>
                  ) : (
                    <Alert severity="info">
                      No design elements found in this file.
                    </Alert>
                  )}
                </Box>
              )}

              {currentTab === 1 && rawJsonResponse && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Raw JSON Response - {selectedFile?.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CopyIcon />}
                        onClick={handleCopyJson}
                      >
                        Copy JSON
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownloadJson}
                      >
                        Download JSON
                      </Button>
                    </Box>
                  </Box>
                  <Card>
                    <CardContent>
                      <pre style={{ 
                        background: '#f5f5f5', 
                        padding: '16px', 
                        borderRadius: '4px',
                        overflow: 'auto',
                        fontSize: '12px',
                        maxHeight: '70vh'
                      }}>
                        {JSON.stringify(rawJsonResponse, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {currentTab === 2 && generatedCode && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Live Preview - {selectedNode?.name}
                  </Typography>
                  <Card sx={{ height: '70vh', overflow: 'hidden' }}>
                    <Box sx={{ 
                      height: '100%', 
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      overflow: 'auto',
                      bgcolor: 'background.paper'
                    }}>
                      <LiveCodePreview code={generatedCode} />
                    </Box>
                  </Card>
                </Box>
              )}

              {currentTab === 3 && generatedCode && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Generated Code for {selectedNode?.name}
                  </Typography>
                  <Card>
                    <CardContent>
                      <pre style={{ 
                        background: '#f5f5f5', 
                        padding: '16px', 
                        borderRadius: '4px',
                        overflow: 'auto',
                        fontSize: '14px'
                      }}>
                        {generatedCode}
                      </pre>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Connect Figma Dialog */}
      <Dialog open={connectDialogOpen} onClose={() => setConnectDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Connect to Figma</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter your Figma Personal Access Token to connect your account and access your design files.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Figma Personal Access Token"
            type="password"
            fullWidth
            variant="outlined"
            value={figmaToken}
            onChange={(e) => setFigmaToken(e.target.value)}
            placeholder="figd_..."
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            You can generate a token in your Figma account settings under "Personal Access Tokens"
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConnectDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConnect} variant="contained" disabled={!figmaToken.trim() || isLoading}>
            {isLoading ? 'Connecting...' : 'Connect'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FigmaIntegration; 