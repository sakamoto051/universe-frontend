import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export const CreateThreadButton = () => {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/thread/create');
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