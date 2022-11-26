import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export const RegisterButton = () => {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/register');
    }
    
    return (
        <Button
            variant='contained'
            onClick={handleClick}
        >
            Register
        </Button>
    )
}