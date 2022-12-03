import { Container, Stack } from '@mui/material';
import { CreateThreadButton } from '../../components/atoms/Button/CreateThreadButton';
import { ThreadCard } from '../../components/molecules/Card/ThreadCard';
import { ThreadInterface } from '../../interfaces/Thread/ThreadInterface';
import { axiosGetSSG } from '../../utils/axios';

export default function Threads(props: any) {
    const { threads } = props;
    return (
        <Container sx={{ mt: 4 }}>
            <Stack spacing={2}>
                <CreateThreadButton />
                {threads && threads.map((thread: ThreadInterface) => {
                    return (
                        <ThreadCard thread={thread} key={thread.id} />
                    )
                })}
            </Stack>
        </Container>
    )
}

export async function getStaticProps() {
    const threads = await axiosGetSSG('/api/thread');
    
    return {
        props: {
            threads,
        }
    }
}