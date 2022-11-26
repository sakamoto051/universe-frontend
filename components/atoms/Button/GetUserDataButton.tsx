import { Button } from '@mui/material';
import axios from 'axios';

export const GetUserDataButton = () => {
    const handleClick = () => {
        axios.get('http://localhost:8080/api/user', { withCredentials: true }).then((response) => {
            console.log(response.data);
        });
    }

    return (
        <Button
            variant='contained'
            onClick={handleClick}
        >
            GET USER DATA
        </Button>
    )
}