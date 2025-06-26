import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tab,
  Tabs,
  Divider,
  LinearProgress,
  Alert,
  Fab,
  Menu,
  MenuItem,
  CardMedia,
  CardActions,
  Tooltip,
  Avatar,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  CloudUpload as UploadIcon,
  Folder as ProjectIcon,
  Image as ScreenIcon,
  Chat as ChatIcon,
  Code as CodeIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Preview as PreviewIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useList, useCreate, useUpdate, useDelete, useGetIdentity } from '@refinedev/core';
import { supabaseClient } from '../../utility';
import VibeChatInterface from '../../components/VibeChatInterface';
import ImageToCodeProcessor from '../../components/ImageToCodeProcessor';
import LiveCodePreview from '../../components/LiveCodePreview';

interface Project {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface Screen {
  id: string;
  project_id: string;
  name: string;
  original_image_url: string;
  current_code?: string;
  status: 'processing' | 'iterating' | 'ready' | 'error';
  iteration_count: number;
  confidence_score?: number;
  created_at: string;
  updated_at: string;
}

interface VibeSession {
  id: string;
  screen_id: string;
  session_type: 'initial_generation' | 'iteration' | 'chat' | 'refinement';
  user_prompt?: string;
  ai_response?: string;
  generated_code?: string;
  ai_provider?: string;
  confidence_score?: number;
  is_accepted: boolean;
  created_at: string;
}

const VibecodingInterface = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [screenName, setScreenName] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuProject, setMenuProject] = useState<Project | null>(null);

  // Get current user identity
  const { data: identity } = useGetIdentity<{
    id: string;
    email?: string;
    name?: string;
  }>();

  // Fetch projects
  const { data: projectsData, isLoading: projectsLoading, refetch: refetchProjects } = useList<Project>({
    resource: 'projects',
    sorters: [{ field: 'updated_at', order: 'desc' }]
  });

  // Fetch screens for selected project
  const { data: screensData, isLoading: screensLoading, refetch: refetchScreens } = useList<Screen>({
    resource: 'screens',
    filters: selectedProject ? [{ field: 'project_id', operator: 'eq', value: selectedProject.id }] : [],
    sorters: [{ field: 'updated_at', order: 'desc' }]
  });

  // Fetch vibe sessions for selected screen
  const { data: vibeSessionsData, isLoading: vibeSessionsLoading } = useList<VibeSession>({
    resource: 'vibe_sessions',
    filters: selectedScreen ? [{ field: 'screen_id', operator: 'eq', value: selectedScreen.id }] : [],
    sorters: [{ field: 'created_at', order: 'desc' }]
  });

  // Mutations
  const { mutate: createProject } = useCreate();
  const { mutate: updateProject } = useUpdate();
  const { mutate: deleteProject } = useDelete();
  const { mutate: createScreen } = useCreate();

  const projects = projectsData?.data || [];
  const screens = screensData?.data || [];
  const vibeSessions = vibeSessionsData?.data || [];

  const handleCreateProject = () => {
    if (!newProjectName.trim() || !identity?.id) return;

    createProject({
      resource: 'projects',
      values: {
        name: newProjectName,
        description: newProjectDescription,
        user_id: identity.id
      }
    }, {
      onSuccess: () => {
        setCreateProjectOpen(false);
        setNewProjectName('');
        setNewProjectDescription('');
        refetchProjects();
      }
    });
  };

  const handleFileUpload = useCallback(async () => {
    if (!uploadFile || !selectedProject || !screenName.trim() || !identity?.id) return;

    try {
      // Upload image to Supabase Storage with user ID as first folder level
      const fileName = `${Date.now()}-${uploadFile.name}`;
      const filePath = `${identity.id}/${selectedProject.id}/${fileName}`;
      
      const { error: uploadError } = await supabaseClient.storage
        .from('screen-images')
        .upload(filePath, uploadFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicData } = supabaseClient.storage
        .from('screen-images')
        .getPublicUrl(filePath);

      // Create screen record
      createScreen({
        resource: 'screens',
        values: {
          project_id: selectedProject.id,
          name: screenName,
          original_image_url: publicData.publicUrl,
          original_image_path: filePath,
          status: 'processing'
        }
      }, {
        onSuccess: async () => {
          console.log('🚀 Screen record created successfully, now calling Magic Patterns API...');
          
          // Call Magic Patterns API after successful upload
          try {
            await callMagicPatternsAPI(uploadFile);
          } catch (apiError) {
            console.error('Magic Patterns API call failed:', apiError);
          }
          
          setUploadDialogOpen(false);
          setUploadFile(null);
          setScreenName('');
          refetchScreens();
        }
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }, [uploadFile, selectedProject, screenName, createScreen, refetchScreens, identity]);

  // Magic Patterns API call function (via Netlify proxy)
  const callMagicPatternsAPI = async (imageFile: File) => {
    console.log('📡 Calling Magic Patterns API via Netlify proxy with image:', imageFile.name);
    
    try {
      // Convert image file to base64 for sending to Netlify function
      const imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Remove the data:image/...;base64, prefix
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      // Prepare request body for Netlify function
      const requestBody = {
        imageData: imageBase64,
        filename: imageFile.name,
        prompt: 'Please look at the attached image and recreate'
      };

      // Call our Netlify proxy function
      const response = await fetch('/.netlify/functions/magic-patterns-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Netlify function failed: ${errorData.error} - ${errorData.details}`);
      }

      const result = await response.json();
      
      // Log the complete response to console
      console.log('✅ Magic Patterns API Response:', result);
      console.log('📄 Source Files:', result.sourceFiles);
      console.log('🔗 Editor URL:', result.editorUrl);
      console.log('👀 Preview URL:', result.previewUrl);
      console.log('💬 Chat Messages:', result.chatMessages);
      
      return result;
      
    } catch (error) {
      console.error('❌ Magic Patterns API Error:', error);
      throw error;
    }
  };

  const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>, project: Project) => {
    setAnchorEl(event.currentTarget);
    setMenuProject(project);
  };

  const handleProjectMenuClose = () => {
    setAnchorEl(null);
    setMenuProject(null);
  };

  const handleDeleteProject = () => {
    if (!menuProject) return;
    
    deleteProject({
      resource: 'projects',
      id: menuProject.id
    }, {
      onSuccess: () => {
        if (selectedProject?.id === menuProject.id) {
          setSelectedProject(null);
          setSelectedScreen(null);
        }
        refetchProjects();
        handleProjectMenuClose();
      }
    });
  };

  const getStatusColor = (status: Screen['status']) => {
    switch (status) {
      case 'ready': return 'success';
      case 'processing': return 'warning';
      case 'iterating': return 'info';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: Screen['status']) => {
    switch (status) {
      case 'ready': return 'Ready';
      case 'processing': return 'Processing';
      case 'iterating': return 'Iterating';
      case 'error': return 'Error';
      default: return status;
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Vibe Coding Studio
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateProjectOpen(true)}
            sx={{ mr: 2 }}
          >
            New Project
          </Button>
          {selectedProject && (
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={() => setUploadDialogOpen(true)}
            >
              Upload Screen
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Projects Sidebar */}
        <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider', overflow: 'auto' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Projects ({projects.length})
            </Typography>
            {projectsLoading ? (
              <LinearProgress />
            ) : (
              <List>
                {projects.map((project) => (
                  <ListItem key={project.id} disablePadding>
                    <ListItemButton
                      selected={selectedProject?.id === project.id}
                      onClick={() => {
                        setSelectedProject(project);
                        setSelectedScreen(null);
                      }}
                    >
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        <ProjectIcon />
                      </Avatar>
                      <ListItemText
                        primary={project.name}
                        secondary={project.description}
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectMenuOpen(e, project);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                ))}
                {projects.length === 0 && (
                  <Alert severity="info">
                    No projects yet. Create your first project to get started!
                  </Alert>
                )}
              </List>
            )}
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {!selectedProject ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6" color="text.secondary">
                Select a project to view its screens
              </Typography>
            </Box>
          ) : (
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {selectedProject.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedProject.description}
              </Typography>

              <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
                <Tab label="Screens" icon={<ScreenIcon />} />
                {selectedScreen && <Tab label="Vibe Chat" icon={<ChatIcon />} />}
                {selectedScreen && <Tab label="Live Preview" icon={<PreviewIcon />} />}
                {selectedScreen && <Tab label="Code Preview" icon={<CodeIcon />} />}
              </Tabs>

              {currentTab === 0 && (
                <Box>
                  {/* Show processing status for any processing screens */}
                  {screens.some(screen => screen.status === 'processing') && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom>
                        Processing Screens
                      </Typography>
                      {screens
                        .filter(screen => screen.status === 'processing')
                        .map(screen => (
                          <Box key={screen.id} sx={{ mb: 2 }}>
                            <ImageToCodeProcessor 
                              screen={screen}
                              onComplete={refetchScreens}
                            />
                          </Box>
                        ))}
                    </Box>
                  )}

                  {/* Regular screens grid */}
                  <Grid container spacing={3}>
                    {screensLoading ? (
                      <Grid item xs={12}>
                        <LinearProgress />
                      </Grid>
                    ) : (
                      screens
                        .filter(screen => screen.status !== 'processing')
                        .map((screen) => (
                          <Grid item xs={12} sm={6} md={4} key={screen.id}>
                            <Card
                              sx={{
                                cursor: 'pointer',
                                border: selectedScreen?.id === screen.id ? 2 : 0,
                                borderColor: 'primary.main'
                              }}
                              onClick={() => setSelectedScreen(screen)}
                            >
                              <CardMedia
                                component="img"
                                height="200"
                                image={screen.original_image_url}
                                alt={screen.name}
                                sx={{ objectFit: 'cover' }}
                              />
                              <CardContent>
                                <Typography variant="h6" gutterBottom>
                                  {screen.name}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Chip
                                    label={getStatusText(screen.status)}
                                    color={getStatusColor(screen.status)}
                                    size="small"
                                  />
                                  <Typography variant="caption" color="text.secondary">
                                    v{screen.iteration_count}
                                  </Typography>
                                </Box>
                                {screen.confidence_score && (
                                  <Box sx={{ mt: 1 }}>
                                    <Typography variant="caption">
                                      Confidence: {(screen.confidence_score * 100).toFixed(0)}%
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={screen.confidence_score * 100}
                                      sx={{ mt: 0.5 }}
                                    />
                                  </Box>
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        ))
                    )}
                    {screens.filter(screen => screen.status !== 'processing').length === 0 && !screensLoading && (
                      <Grid item xs={12}>
                        <Alert severity="info">
                          No screens in this project. Upload your first screen to start vibe-coding!
                        </Alert>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}

              {currentTab === 1 && selectedScreen && (
                <Box sx={{ height: '70vh' }}>
                  <VibeChatInterface
                    screen={selectedScreen}
                    sessions={vibeSessions}
                    onSessionUpdate={() => {
                      // Refetch vibe sessions when they're updated
                      refetchScreens();
                    }}
                    onScreenUpdate={refetchScreens}
                  />
                </Box>
              )}

              {currentTab === 2 && selectedScreen && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Live Preview - {selectedScreen.name}
                  </Typography>
                  {selectedScreen.current_code ? (
                    <Card sx={{ height: '70vh', overflow: 'hidden' }}>
                      <Box sx={{ 
                        height: '100%', 
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'auto',
                        bgcolor: 'background.paper'
                      }}>
                        <LiveCodePreview code={selectedScreen.current_code} />
                      </Box>
                    </Card>
                  ) : (
                    <Alert severity="info">
                      No code generated yet for this screen. The live preview will appear once code is generated.
                    </Alert>
                  )}
                </Box>
              )}

              {currentTab === 3 && selectedScreen && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Generated Code for {selectedScreen.name}
                  </Typography>
                  {selectedScreen.current_code ? (
                    <Card>
                      <CardContent>
                        <pre style={{ 
                          background: '#f5f5f5', 
                          padding: '16px', 
                          borderRadius: '4px',
                          overflow: 'auto',
                          fontSize: '14px'
                        }}>
                          {selectedScreen.current_code}
                        </pre>
                      </CardContent>
                    </Card>
                  ) : (
                    <Alert severity="info">
                      No code generated yet for this screen.
                    </Alert>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Create Project Dialog */}
      <Dialog open={createProjectOpen} onClose={() => setCreateProjectOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            variant="outlined"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description (Optional)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateProjectOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateProject} variant="contained" disabled={!newProjectName.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Screen Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Screen Image</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Screen Name"
            fullWidth
            variant="outlined"
            value={screenName}
            onChange={(e) => setScreenName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadIcon />}
            fullWidth
            sx={{ mb: 2, p: 2 }}
          >
            {uploadFile ? uploadFile.name : 'Choose Image File'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            />
          </Button>
          {uploadFile && (
            <Box sx={{ mt: 2 }}>
              <img
                src={URL.createObjectURL(uploadFile)}
                alt="Preview"
                style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleFileUpload} 
            variant="contained" 
            disabled={!uploadFile || !screenName.trim()}
          >
            Upload & Process
          </Button>
        </DialogActions>
      </Dialog>

      {/* Project Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProjectMenuClose}
      >
        <MenuItem onClick={handleProjectMenuClose}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteProject}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default VibecodingInterface;