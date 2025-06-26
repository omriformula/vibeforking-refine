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
  Image as ImageIcon
} from '@mui/icons-material';
import LiveCodePreview from '../../components/LiveCodePreview';

interface FigmaFile {
  key: string;
  name: string;
  thumbnail_url?: string;
  last_modified: string;
}

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

const FigmaIntegration = () => {
  const [figmaToken, setFigmaToken] = useState('figd_DpCLNHWBW36aPFlobWTuk6JcE1g0-APGK2JwyNEi');
  const [figmaFileUrl, setFigmaFileUrl] = useState('b6cCoBPoxVOlanhY4aqlun');
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [figmaFiles, setFigmaFiles] = useState<FigmaFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<FigmaFile | null>(null);
  const [figmaNodes, setFigmaNodes] = useState<FigmaNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<FigmaNode | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');

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
      setFigmaFileUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Figma file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCode = async (node: FigmaNode) => {
    if (!figmaToken || !selectedFile) return;

    setIsLoading(true);
    setError('');
    setSelectedNode(node);

    try {
      // Export the node as an image first
      const exportResponse = await fetch(
        `https://api.figma.com/v1/images/${selectedFile.key}?ids=${node.id}&format=png&scale=2`,
        {
          headers: {
            'X-Figma-Token': figmaToken
          }
        }
      );

      if (!exportResponse.ok) {
        throw new Error('Failed to export Figma node');
      }

      const exportData = await exportResponse.json();
      const imageUrl = exportData.images[node.id];

      if (!imageUrl) {
        throw new Error('No image URL returned from Figma');
      }

      // For now, just generate a simple mock component
      // Later you can integrate with your preferred AI service
      const mockGeneratedCode = `
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ${node.name.replace(/[^a-zA-Z0-9]/g, '')}Component = () => {
  return (
    <Box sx={{ 
      padding: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      backgroundColor: '#f5f5f5',
      borderRadius: 2,
      minHeight: 200
    }}>
      <Typography variant="h4" component="h1">
        ${node.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        This is a mock component generated from your Figma design: "${node.name}"
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Node ID: ${node.id}
      </Typography>
      <Button variant="contained" color="primary">
        Sample Button
      </Button>
      <Box sx={{
        width: '100%',
        height: 100,
        backgroundColor: 'primary.main',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="body2" color="white">
          Design Element from Figma
        </Typography>
      </Box>
    </Box>
  );
};

export default ${node.name.replace(/[^a-zA-Z0-9]/g, '')}Component;
      `.trim();

      setGeneratedCode(mockGeneratedCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate code');
    } finally {
      setIsLoading(false);
    }
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

              {currentTab === 1 && generatedCode && (
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

              {currentTab === 2 && generatedCode && (
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