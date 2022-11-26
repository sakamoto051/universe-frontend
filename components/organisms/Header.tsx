import { Stack } from '@mui/material';
import { Container } from '@mui/system';
import { GetUserDataButton } from '../atoms/Button/GetUserDataButton';
import { HomeButton } from '../atoms/Button/HomeButton';
import { LoginButton } from '../atoms/Button/LoginButton';
import { LogoutButton } from '../atoms/Button/LogoutButton';
import { RegisterButton } from '../atoms/Button/RegisterButton';

export const Header = () => {
    return (
        <>
            <Container sx={{ p: 1 }}>
                <Stack spacing={2} direction='row'>
                    <HomeButton />
                    <RegisterButton />
                    <LoginButton />
                    <LogoutButton />
                    <GetUserDataButton />
                </Stack>
            </Container>
        </>
    );
}