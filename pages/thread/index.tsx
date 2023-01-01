import { CircularProgress, Container, Stack } from '@mui/material';
import { CreateThreadButton } from '../../components/atoms/Button/CreateThreadButton';
import { ThreadCard } from '../../components/molecules/Card/ThreadCard';
import { ThreadInterface } from '../../interfaces/Thread/ThreadInterface';
import useSWR from 'swr';
import { BasicLoading } from '../../components/atoms/Loading/BasicLoading';
import { fetcher } from '../../functions/CommonProvider';
import { Header } from '../../components/organisms/Header';

export default function Threads() {
    const { data, error, isLoading } = useSWR('/api/thread', fetcher);
    if (!data) return <BasicLoading />

    return (
        <Container sx={{ mt: 4 }}>
            <Stack spacing={2}>
                <CreateThreadButton />
                {data.map((thread: ThreadInterface) => {
                    return (
                        <ThreadCard thread={thread} key={thread.id} />
                    )
                })}
            </Stack>
        </Container>
    )
}