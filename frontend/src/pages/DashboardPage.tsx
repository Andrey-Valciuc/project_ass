import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, TextField, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CommentList } from '../components/CommentList';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            const response = await axios.get(`${process.env.REACT_APP_POST_SERVICE_URL}/api/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
        } catch (error: any) {
            setMessage('Failed to fetch posts: ' + error.message);
        }
    };

    const handleAddPost = async () => {
        if (!title || !content) {
            setMessage('Please fill in both title and content.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            await axios.post(`${process.env.REACT_APP_POST_SERVICE_URL}/api/posts/create`, { title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTitle('');
            setContent('');
            setOpenCreatePostModal(false);
            fetchPosts();
        } catch (error: any) {
            setMessage('Failed to add post: ' + error.response?.data?.message || error.message);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            setMessage('Please enter a search query.');
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_SEARCH_SERVICE_URL}/api/search`, {
                params: { query: searchQuery },
            });
            setSearchResults(response.data);
        } catch (error: any) {
            setMessage('Failed to search posts: ' + error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" padding={4} bgcolor="#f4f6f9">
            <Typography variant="h4" color="primary" gutterBottom>
                Dashboard
            </Typography>

            {/* Add New Post Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenCreatePostModal(true)}
                sx={{ marginBottom: 3 }}
            >
                Add New Post
            </Button>

            {/* Search Section */}
            <Grid container spacing={2} justifyContent="center" mb={4}>
                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Search Posts
                    </Typography>
                    <TextField
                        label="Search Query"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleSearch}
                        sx={{ marginTop: 2 }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>

            {/* Display search message or results */}
            {message && <Typography color="error">{message}</Typography>}

            {/* Search Results */}
            {searchResults.length > 0 && (
                <Box width="100%" maxWidth="800px" marginTop={4}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Search Results
                    </Typography>
                    <List>
                        {searchResults.map((post: any) => (
                            <ListItem key={post.id} divider>
                                <ListItemText primary={post.title} secondary={post.content.slice(0, 100) + '...'} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* All Posts Section */}
            <Grid container spacing={4} justifyContent="center">
                {posts.map((post: any) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="primary">{post.title}</Typography>
                                <Typography variant="body2" color="textSecondary" noWrap>
                                    {post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <CommentList postId={post.id} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Logout Button */}
            <Button
                variant="text"
                color="secondary"
                onClick={handleLogout}
                sx={{ marginTop: 3 }}
            >
                Logout
            </Button>

            {/* Modal to Create Post */}
            <Dialog open={openCreatePostModal} onClose={() => setOpenCreatePostModal(false)}>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreatePostModal(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddPost} color="primary">
                        Create Post
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DashboardPage;
