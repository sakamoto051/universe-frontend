import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export const CreateThreadButton = () => {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/threads/create');
    }
    
    return (
        <Button
            variant='contained'
            onClick={handleClick}
        >
            Create
        </Button>
    )
}