import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export const ThreadButton = () => {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/thread');
    }
    
    return (
        <Button
            variant='contained'
            onClick={handleClick}
        >
            Thread
        </Button>
    )
}