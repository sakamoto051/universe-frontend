import { Stack } from '@mui/material';
import { Container } from '@mui/system';
import { HomeButton } from '../atoms/Button/HomeButton';
import { LogoutButton } from '../atoms/Button/LogoutButton';
import useSWR from 'swr';
import { fetcher, getToken } from '../../functions/CommonProvider';
import { BasicLoading } from '../atoms/Loading/BasicLoading';
import { ThreadButton } from '../atoms/Button/ThreadButton';
import Head from 'next/head';

export const Header = () => {
    const { data } = useSWR('/api/user', fetcher);
    if (!data) return <BasicLoading />
    const csrfToken = getToken();

    return (
        <Container sx={{ p: 2 }}>
            <Head>
                <meta name="csrf-token" content={csrfToken} />
            </Head>
            <Stack spacing={2} direction='row'>
                <HomeButton />
                <ThreadButton />
                <LogoutButton />
            </Stack>
        </Container>
    );
}