import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export const LoginButton = () => {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/login');
    }
    
    return (
        <Button
            variant='contained'
            onClick={handleClick}
        >
            Login
        </Button>
    )
}