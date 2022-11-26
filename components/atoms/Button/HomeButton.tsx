import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export const HomeButton = () => {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/');
    }
    
    return (
        <Button
            variant='contained'
            onClick={handleClick}
        >
            HOME
        </Button>
    )
}