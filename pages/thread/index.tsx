import { Container, Stack, Typography } from '@mui/material';
import { ThreadCard } from '../../components/molecules/Card/ThreadCard';
import { ThreadInterface } from '../../interfaces/Thread/ThreadInterface';
import useSWR, { useSWRConfig } from 'swr';
import { BasicLoading } from '../../components/atoms/Loading/BasicLoading';
import { fetcher } from '../../functions/CommonProvider';
import { useState } from 'react';
import { axiosPost } from '../../functions/AxiosClientProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StoreThreadToggleButton } from '../../components/atoms/Button/StoreThreadToggleButton';
import { StoreThreadDrawer } from '../../components/organisms/StoreThreadDrawer';
import { StoreThreadInput } from '../../interfaces/Comment/StoreThreadInput';

export default function Threads() {
    const [state, setState] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { data: threads } = useSWR('/api/thread', fetcher);
    // const { data: user } = useSWR('/api/user', fetcher);
    const { mutate } = useSWRConfig();
    const { register, handleSubmit, setValue } = useForm<StoreThreadInput>();
    // if (!threads || !user) return <BasicLoading />
    // setValue('user_id', user.id);

    const onSubmit: SubmitHandler<StoreThreadInput> = async (data) => {
        await axiosPost('/api/thread', data);
        setTitle('');
        setContent('');
        mutate('/api/thread');
        setState(false);
    }

    const toggleDrawer =
        (open: boolean) =>
            (event: KeyboardEvent | MouseEvent) => {
                setState(open);
            };
    
    return (
        <Container sx={{ mt: 2 }}>
            <Stack spacing={2} sx={{ mb: 2 }}>
                <Typography variant='h5'>All Threads</Typography>
                {threads && threads.map((thread: ThreadInterface) => {
                    return (
                        <ThreadCard thread={thread} key={thread.id} />
                    )
                })}

                <Container sx={{ position: 'fixed', bottom: '5%', left: '80%' }}>
                    <StoreThreadToggleButton toggleDrawer={toggleDrawer} />
                </Container>
                <StoreThreadDrawer
                    state={state}
                    toggleDrawer={toggleDrawer}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register}
                    title={title}
                    content={content}
                    setTitle={setTitle}
                    setContent={setContent}
                    />
            </Stack>
        </Container>
    )
}