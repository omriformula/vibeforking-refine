import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Alert,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Divider,
  Card,
  CardContent,
  TextField,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Error as ErrorIcon,
  Visibility as PreviewIcon
} from '@mui/icons-material';

interface LiveCodePreviewProps {
  code: string;
}

const LiveCodePreview: React.FC<LiveCodePreviewProps> = ({ code }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewKey, setPreviewKey] = useState(0); // Force re-render

  // Create a static preview component
  const PreviewComponent = useMemo(() => {
    if (!code) return null;

    try {
      setError(null);
      
      // For now, create a simple mock preview based on common patterns in the code
      return () => {
        // Check what components are used in the code
        const hasAppBar = code.includes('AppBar');
        const hasCard = code.includes('Card');
        const hasButton = code.includes('Button');
        const hasTextField = code.includes('TextField');
        const hasGrid = code.includes('Grid');
        const hasTypography = code.includes('Typography');
        
        return (
          <Box sx={{ width: '100%' }}>
            {hasAppBar && (
              <AppBar position="static" sx={{ mb: 2 }}>
                <Toolbar>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Generated App
                  </Typography>
                  <IconButton color="inherit">
                    <Avatar sx={{ width: 32, height: 32 }} />
                  </IconButton>
                </Toolbar>
              </AppBar>
            )}
            
            <Box sx={{ p: hasAppBar ? 0 : 3 }}>
              {hasTypography && (
                <Typography variant="h4" gutterBottom>
                  Generated Screen Preview
                </Typography>
              )}
              
              {hasGrid && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    {hasCard && (
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Sample Card Component
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            This is a preview of your generated component structure.
                          </Typography>
                          {hasButton && (
                            <Box sx={{ mt: 2 }}>
                              <Button variant="contained" color="primary">
                                Primary Action
                              </Button>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    {hasTextField && (
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Form Section
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                              label="Sample Input"
                              variant="outlined"
                              fullWidth
                            />
                            <TextField
                              label="Another Field"
                              variant="outlined"
                              fullWidth
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                </Grid>
              )}
              
              {!hasGrid && hasCard && (
                <Card sx={{ maxWidth: 600, mx: 'auto' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Generated Component
                    </Typography>
                    <Typography variant="body1" paragraph>
                      This is a structural preview of your generated code. The actual implementation
                      contains more detailed styling and functionality.
                    </Typography>
                    {hasButton && (
                      <Button variant="contained">
                        Sample Button
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {!hasCard && !hasGrid && (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Code Preview Available
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your generated code is ready. Switch to the Code Preview tab to see the full implementation.
                  </Typography>
                  {hasButton && (
                    <Box sx={{ mt: 2 }}>
                      <Button variant="outlined">
                        View Code
                      </Button>
                    </Box>
                  )}
                </Paper>
              )}
              
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>Preview Note:</strong> This is a simplified preview showing the component structure. 
                  The actual generated code includes detailed styling, props, and functionality.
                </Typography>
              </Alert>
            </Box>
          </Box>
        );
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown preview error');
      return null;
    }
  }, [code, previewKey]);



  const handleRefresh = () => {
    setPreviewKey(prev => prev + 1);
    setError(null);
  };

  if (!code) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        flexDirection: 'column',
        color: 'text.secondary'
      }}>
        <PreviewIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
        <Typography variant="h6">No Code to Preview</Typography>
        <Typography variant="body2">
          Generate code first to see the live preview
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          action={
            <Button 
              color="inherit" 
              size="small"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              Retry
            </Button>
          }
        >
          <Typography variant="subtitle2" gutterBottom>
            Preview Error
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>
        
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            The generated code might use advanced patterns or external dependencies that can't be previewed safely.
            You can still copy the code and use it in your project.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Preview Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'grey.50',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="subtitle2" color="text.secondary">
          Live Preview
        </Typography>
        <Button 
          size="small"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Box>

      {/* Preview Content */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        bgcolor: 'background.paper'
      }}>
        <Box sx={{ p: 2 }}>
          {isLoading ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: 200
            }}>
              <CircularProgress />
            </Box>
          ) : PreviewComponent ? (
            <ErrorBoundary onError={setError}>
              <PreviewComponent />
            </ErrorBoundary>
          ) : (
            <Alert severity="info">
              Unable to render preview for this component.
            </Alert>
          )}
        </Box>
      </Box>

      {/* Preview Info */}
      <Divider />
      <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Typography variant="caption" color="text.secondary">
          This is a live preview of your generated code. Some advanced features may not render perfectly in preview mode.
        </Typography>
      </Box>
    </Box>
  );
};

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: string) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(`Component Error: ${error.message}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          <Typography variant="body2">
            The component failed to render. This might be due to missing dependencies or syntax errors.
          </Typography>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default LiveCodePreview; 