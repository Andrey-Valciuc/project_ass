import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/register');
    };

    return (
        <Button
            variant='contained'
            onClick={handleClick}
        >
            Register
        </Button>
    );
};
