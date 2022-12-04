import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { axiosGet } from '../../../functions/AxiosClientProvider';

export const LogoutButton = () => {
    const router = useRouter();

    const handleClick = async () => {
        await axiosGet('/api/logout');
        router.push('/login');
    }

    return (
        <Button
            variant='contained'
            onClick={handleClick}
        >
            Logout
        </Button>
    )
}