import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';


export const CreatePostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/posts', {
                title,
                content,
                authorId: '1',
            });
            setMessage(`Post created: ${response.data.post.title}`);
        } catch (error: any) {
            setMessage('Failed to create post: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Create Post
                </Typography>
                <form onSubmit={handleCreatePost}>
                    <TextField
                        label="Title"
                        fullWidth
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        label="Content"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        sx={{ marginTop: 2 }}
                    >
                        Create Post
                    </Button>
                </form>
                <Typography color="primary" align="center" mt={2}>
                    {message}
                </Typography>
            </Paper>
        </Box>
    );
};
