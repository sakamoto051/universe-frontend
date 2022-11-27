import { Button } from '@mui/material';
import axios from 'axios';

export const GetUserDataButton = () => {
    const handleClick = () => {
        axios.get('http://localhost:8081/api/user', { withCredentials: true }).then((res) => {
            console.log(res.data);
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