import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            setMessage('Registration successful!');
        } catch (error: any) {
            setMessage('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    const handleGoToLogin = () => {
        navigate('/');
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
                    Register
                </Typography>
                <form onSubmit={handleRegister}>
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
                        Register
                    </Button>
                </form>
                <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={handleGoToLogin}
                >
                    Login
                </Button>
                <Typography color="error" align="center" mt={2}>
                    {message}
                </Typography>
            </Paper>
        </Box>
    );
};

export default RegisterForm;
