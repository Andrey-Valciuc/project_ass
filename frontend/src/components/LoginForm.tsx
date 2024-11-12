import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            localStorage.setItem('token', response.token);
            setMessage('Login successful!');
            navigate('/dashboard');
        } catch (error: any) {
            setMessage('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    const handleGoToRegister = () => {
        navigate('/register');
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={handleGoToRegister}
                >
                    Go to Register
                </Button>
                <Typography color="error" align="center" mt={2}>
                    {message}
                </Typography>
            </Paper>
        </Box>
    );
};

export default LoginForm;
