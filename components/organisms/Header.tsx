import { Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { GetUserDataButton } from '../atoms/Button/GetUserDataButton';
import { HomeButton } from '../atoms/Button/HomeButton';
import { LoginButton } from '../atoms/Button/LoginButton';
import { LogoutButton } from '../atoms/Button/LogoutButton';
import { RegisterButton } from '../atoms/Button/RegisterButton';
import useSWR from 'swr';
import { fetcher } from '../../functions/CommonProvider';
import { BasicLoading } from '../atoms/Loading/BasicLoading';

export const Header = () => {
    const { data, error, isLoading } = useSWR('/api/user', fetcher);
    if (!data) return <BasicLoading />

    return (
        <Container sx={{ p: 1 }}>
            <Stack spacing={2} direction='row'>
                <HomeButton />
                <RegisterButton />
                <LoginButton />
                <LogoutButton />
                <GetUserDataButton />
                <Typography>Welcome {data.name}</Typography>
            </Stack>
        </Container>
    );
}