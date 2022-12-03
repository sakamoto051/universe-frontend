import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../../consts/consts';
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
    const threads = await axios.get('http://' + BASE_URL + ':8081/api/thread', { withCredentials: true })
        .then(res => res.data)
        .catch(err => {
            throw new Error(err);
        })

    const paths = threads.map((thread: ThreadInterface) => {
        return {
            params: { id: thread.id.toString() }
        }
    });

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    const thread = await axios.get('http://' + BASE_URL + `:8081/api/thread/${params.id}`, { withCredentials: true })
        .then(res => res.data)
        .catch(err => {
            throw new Error(err);
        });
    return {
        props: thread,
    }
}