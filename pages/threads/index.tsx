import { Button, Card, CardActions, CardContent, Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface AuthUserData {
    id: number,
    name: string,
    email: string,
    password: string,
}

interface Thread {
    user_id: number,
    title: string,
    content: string,
}

export default function Threads() {
    const [user, setUser] = useState<AuthUserData>({
        id: 0,
        name: '',
        email: '',
        password: '',
    });
    const [threads, setThreads] = useState<Thread[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/user', { withCredentials: true }).then((response) => {
            setUser((prevState) => response.data);
        });
    }, []);
    useEffect(() => {
        axios.get('http://localhost:8080/api/thread_list', { withCredentials: true }).then((response) => {
            response.data.forEach((thread: Thread) => {
                const newThread: Thread = {
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
            <Container sx={{ mt: 10 }}>
                <Typography>
                    id : {user['id']}
                </Typography>
                <Typography>
                    name : {user['name']}
                </Typography>
                <Stack spacing={2}>
                    {threads && threads.map((thread) => {
                        return (
                            <Card sx={{ minWidth: 275 }} key={thread.title}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Title: {thread.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        user_id: {thread.user_id}
                                    </Typography>
                                    <Typography variant="body2">
                                        content: {thread.content}
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