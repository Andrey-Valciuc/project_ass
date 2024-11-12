import React, { useState, useEffect } from 'react';
import { fetchComments, createComment } from '../api/commentApi';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

interface CommentListProps {
    postId: string;
}


export const CommentList = ({ postId }: CommentListProps) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadComments();
    });

    const loadComments = async () => {
        try {
            const data = await fetchComments(postId);
            setComments(data);
        } catch (error: any) {
            setMessage('Failed to fetch comments: ' + error.message);
        }
    };

    const handleAddComment = async () => {
        if (!newComment) {
            setMessage('Comment cannot be empty');
            return;
        }

        try {
            await createComment(postId, newComment);
            setNewComment('');
            loadComments();
        } catch (error: any) {
            setMessage('Failed to add comment: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <Box mt={2}>
            <Typography variant="h6">Comments</Typography>

            <Box display="flex" alignItems="center" mb={2}>
                <TextField
                    label="Write a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    size="small"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={1}
                    sx={{ marginRight: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddComment}
                    sx={{ height: '100%' }}
                >
                    Add
                </Button>
            </Box>

            {message && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                    {message}
                </Typography>
            )}

            <List>
                {comments.length === 0 ? (
                    <Typography>No comments yet.</Typography>
                ) : (
                    comments.map((comment: any) => (
                        <ListItem key={comment.id} divider>
                            <ListItemText primary={comment.content} secondary={`By user ${comment.author_id}`} />
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );
};
