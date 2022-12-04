import { Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { AuthUserInterface } from '../../interfaces/AuthUserInterface';
import { axiosGet } from '../../functions/AxiosClientProvider';
import { GetUserDataButton } from '../atoms/Button/GetUserDataButton';
import { HomeButton } from '../atoms/Button/HomeButton';
import { LoginButton } from '../atoms/Button/LoginButton';
import { LogoutButton } from '../atoms/Button/LogoutButton';
import { RegisterButton } from '../atoms/Button/RegisterButton';

export const Header = () => {
    const [user, setUser] = useState<AuthUserInterface>({
        id: 0,
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        (async () => {
            const user = await axiosGet('/api/user');
            setUser(user);
        })();
    }, []);

    return (
        <>
            <Container sx={{ p: 1 }}>
                <Stack spacing={2} direction='row'>
                    <HomeButton />
                    <RegisterButton />
                    <LoginButton />
                    <LogoutButton />
                    <GetUserDataButton />
                    <Typography>Welcome {user.name}</Typography>
                </Stack>
            </Container>
        </>
    );
}