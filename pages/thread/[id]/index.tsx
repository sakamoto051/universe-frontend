import { Button, Container, Drawer, List, Stack, TextField } from '@mui/material';
import { ThreadDetail } from '../../../components/organisms/ThreadDetail';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../../functions/CommonProvider';
import { BasicLoading } from '../../../components/atoms/Loading/BasicLoading';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StoreCommentInput } from '../../../interfaces/Comment/StoreCommentInput';
import { axiosPost } from '../../../functions/AxiosClientProvider';

export default function Thread() {
    const router = useRouter();
    const thread_id = router.query.id;
    const [state, setState] = useState(false);
    const { data: thread_detail } = useSWR('/api/thread_detail/' + thread_id, fetcher);
    const { data: user } = useSWR('/api/user', fetcher);
    const { register, handleSubmit, setValue } = useForm<StoreCommentInput>();
    if (!thread_detail) return <BasicLoading />
    if (!thread_id) {
        return;
    }
    setValue('user_id', user.id);
    setValue('thread_id', +thread_id);

    const onSubmit: SubmitHandler<StoreCommentInput> = async (data) => {
        await axiosPost('/api/comment', data);
        router.reload();
    }

    const toggleDrawer =
        (open: boolean) =>
            (event: KeyboardEvent | MouseEvent) => {
                setState(open);
            };
    
    return (
        <Container sx={{ mt: 10 }}>
            <ThreadDetail thread={thread_detail.thread} comments={thread_detail.comments} />

            <Container sx={{ position: 'fixed', bottom: '5%', left: '80%' }}>
                <Button variant='contained' onClick={toggleDrawer(true)}>
                    COMMENT
                </Button>
            </Container>
            <Drawer
                anchor={'bottom'}
                open={state}
                onClose={toggleDrawer(false)}
            >
            <List>
                <Container>
                    <Stack
                        spacing={2}
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                            COMMENT
                        </Button>
                    </Stack>
                </Container>
            </List>
            </Drawer>
        </Container>
    )
}