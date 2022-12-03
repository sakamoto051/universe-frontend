import { Button, Card, CardActions, CardContent, Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CreateThreadButton } from '../../components/atoms/Button/CreateThreadButton';
import { ThreadInterface } from '../../interfaces/Thread/ThreadInterface';

export default function Threads() {
    const [threads, setThreads] = useState<ThreadInterface[]>([]);
    const router = useRouter();

    useEffect(() => {
        try {
            axios.get('http://localhost:8081/api/thread', { withCredentials: true }).then((res) => {
                res.data.forEach((thread: ThreadInterface) => {
                    const newThread: ThreadInterface = {
                        id: thread.id,
                        user_id: thread.user_id,
                        title: thread.title,
                        content: thread.content,
                    }
                    setThreads((prevState) => [...prevState, newThread]);
                })
            });
        } catch (e: any) {
            throw new Error(e);
        }
    }, []);

    return (
        <>
            <Container sx={{ mt: 4 }}>
                <Stack spacing={2}>
                    <CreateThreadButton />
                    {threads && threads.map((thread) => {
                        return (
                            <Card sx={{ minWidth: 275 }} key={thread.id}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {thread.id} / {thread.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {thread.content}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            router.push(`thread/${thread.id}`);
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </Stack>
            </Container>
        </>
    )
}