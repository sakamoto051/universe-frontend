import { Button, Container, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StoreThreadInterface } from '../../interfaces/Thread/StoreThreadInterface';
import { axiosPost } from '../../functions/AxiosClientProvider';
import { getAuth } from '../../functions/CommonProvider';

export default function CreateThread() {
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm<StoreThreadInterface>();
    const user = getAuth();
    setValue('user_id', user.id);

    const onSubmit: SubmitHandler<StoreThreadInterface> = async (data) => {
        try {
            await axiosPost('/api/thread', data);
            router.push('/thread');
        } catch (error) {
            console.log(error);
        }
    }

    return (
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

                {/* <TextField
                    label="Content"
                    multiline
                    rows={10}
                    variant="outlined"
                    {...register('content')}
                /> */}

                <Button
                    type='submit'
                    variant='contained'
                >
                    Create Thread
                </Button>
            </Stack>
        </Container>
    )
}