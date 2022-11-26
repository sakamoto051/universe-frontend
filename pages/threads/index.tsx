import { Button, Card, CardActions, CardContent, Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CreateThreadButton } from '../../components/atoms/Button/CreateThreadButton';
import { ThreadInterface } from '../../interfaces/Thread/ThreadInterface';

export default function Threads() {
    const [threads, setThreads] = useState<ThreadInterface[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/thread_list', { withCredentials: true }).then((response) => {
            response.data.forEach((thread: ThreadInterface) => {
                const newThread: ThreadInterface = {
                    user_id: thread.user_id,
                    title: thread.title,
                    content: thread.content,
                }
                setThreads((prevState) => [...prevState, newThread]);
            })
        });
    }, []);

    return (
        <>
            <Container sx={{ mt: 4 }}>
                <Stack spacing={2}>
                <CreateThreadButton />
                    {threads && threads.map((thread) => {
                        return (
                            <Card sx={{ minWidth: 275 }} key={thread.title}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {thread.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {thread.content}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </Stack>
            </Container>
        </>
    )
}