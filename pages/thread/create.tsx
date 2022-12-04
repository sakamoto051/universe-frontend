import { Button, Container, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthUserInterface } from '../../interfaces/AuthUserInterface';
import { StoreThreadInterface } from '../../interfaces/Thread/StoreThreadInterface';
import { axiosGet, axiosPost } from '../../functions/AxiosClientProvider';

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
        (async () => {
            const user = await axiosGet('/api/user');
            setUser(user);
        })();
    }, []);

    const onSubmit: SubmitHandler<StoreThreadInterface> = async (data) => {
        data = {
            ...data,
            user_id: user['id'],
        }
        try {
            await axiosPost('/api/thread', data);
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