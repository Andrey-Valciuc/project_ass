import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LoginButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <Button
            variant='outlined'
            onClick={handleClick}
        >
            Login
        </Button>
    );
};
