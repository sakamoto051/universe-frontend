import { Button } from '@mui/material';
import { axiosGet } from '../../../utils/axios';

export const GetUserDataButton = () => {
    const handleClick = async () => {
        const user = await axiosGet('/api/user');
        console.log(user)
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