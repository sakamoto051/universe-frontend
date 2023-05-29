import { Stack } from '@mui/material';
import { Container } from '@mui/system';
import { HomeButton } from '../atoms/Button/HomeButton';
import { LogoutButton } from '../atoms/Button/LogoutButton';
import useSWR from 'swr';
import { fetcher } from '../../functions/CommonProvider';
import { BasicLoading } from '../atoms/Loading/BasicLoading';
import { ThreadButton } from '../atoms/Button/ThreadButton';

export const Header = () => {
    const { data } = useSWR('/api/user', fetcher);
    if (!data) return <BasicLoading />

    return (
        <Container sx={{ p: 2 }}>
            <Stack spacing={2} direction='row'>
                <HomeButton />
                <ThreadButton />
                <LogoutButton />
            </Stack>
        </Container>
    );
}