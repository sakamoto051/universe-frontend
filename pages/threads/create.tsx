import { Button, Container, Input, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface StoreThreadInput {
    user_id: number,
    title: string,
    content: string,
}

interface AuthUserData {
    id: number,
    name: string,
    email: string,
    password: string,
}

export default function CreateThread() {


    const router = useRouter();
    const [user, setUser] = useState<AuthUserData>({
        id: 0,
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        getUser(setUser);
    }, []);

    const { register, handleSubmit } = useForm<StoreThreadInput>();

    const onSubmit: SubmitHandler<StoreThreadInput> = async (data) => {
        data = {
            ...data,
            user_id: user['id'],
        }
        try {
            await axios.post('http://localhost:8080/api/thread', data, { withCredentials: true })
                .then((res) => console.log(res))
                .catch((error) => {
                    throw new Error(error);
                });
            router.push('/threads');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Container sx={{ mt: 10 }}>
                <Typography>
                   id : {user['id']}
                </Typography>
                <Typography>
                    name : {user['name']}
                </Typography>
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

async function getUser(setUser: any)
{
    axios.get('http://localhost:8080/api/user', { withCredentials: true })
        .then((response) => {
            setUser(response.data);
        });
}