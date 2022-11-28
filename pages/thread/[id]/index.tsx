import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { ThreadInterface } from '../../../interfaces/Thread/ThreadInterface';

export default function Thread(thread: ThreadInterface) {
    return (
        <>
            <Container sx={{ mt: 10 }}>
                {thread && (
                    <Stack spacing={2}>
                        <Typography variant='h2'>
                            {thread.title}
                        </Typography>
                        <Typography>
                            {thread.content}
                        </Typography>
                    </Stack>
                )}
            </Container>
        </>
    )
}

export async function getStaticPaths() {
    const res = await axios.get('http://172.20.25.171:8081/api/thread', { withCredentials: true });
    const threads: ThreadInterface[] = res.data;

    const paths = threads.map((thread: ThreadInterface) => {
        return `/thread/${thread.id}`;
    });

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    const res = await axios.get(`http://172.20.25.171:8081/api/thread/${params.id}`, { withCredentials: true });

    return {
        props: res.data
    }
}