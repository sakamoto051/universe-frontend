import { Button, Container, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthUserInterface } from '../../interfaces/AuthUserInterface';
import { StoreThreadInterface } from '../../interfaces/Thread/StoreThreadInterface';

export default function CreateThread() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<StoreThreadInterface>();
    const [user, setUser] = useState<AuthUserInterface>({
        id: 0,
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        axios.get('http://localhost:8081/api/user', { withCredentials: true })
            .then((response) => {
                setUser(response.data);
            });
    }, []);

    const onSubmit: SubmitHandler<StoreThreadInterface> = async (data) => {
        data = {
            ...data,
            user_id: user['id'],
        }
        try {
            await axios.post('http://localhost:8081/api/thread', data, { withCredentials: true })
                .then((res) => console.log(res))
                .catch((error) => {
                    throw new Error(error);
                });
            router.push('/thread');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Container sx={{ mt: 4 }}>
                <Stack
                    spacing={4}
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        label='Title'
                        variant='outlined'
                        {...register('title')}
                    />

                    <TextField
                        label="Content"
                        multiline
                        rows={10}
                        variant="outlined"
                        {...register('content')}
                    />

                    <Button
                        type='submit'
                        variant='contained'
                    >
                        Create Thread
                    </Button>
                </Stack>
            </Container>
        </>
    )
}