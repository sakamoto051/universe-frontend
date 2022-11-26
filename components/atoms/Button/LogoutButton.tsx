import { Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

export const LogoutButton = () => {
    const router = useRouter();

    const handleClick = () => {
        axios.get(
            'http://localhost:8080/api/logout',
            { withCredentials: true }
        )
        .then((response) => {
            console.log(response.data);
        });
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