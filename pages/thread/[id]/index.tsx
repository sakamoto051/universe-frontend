import { Container } from '@mui/material';
import { ThreadDetail } from '../../../components/organisms/ThreadDetail';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../../functions/CommonProvider';
import { BasicLoading } from '../../../components/atoms/Loading/BasicLoading';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StoreCommentInput } from '../../../interfaces/Comment/StoreCommentInput';
import { axiosPost } from '../../../functions/AxiosClientProvider';
import { StoreCommentDrawer } from '../../../components/organisms/StoreCommentDrawer';
import { StoreCommentToggleButton } from '../../../components/atoms/Button/StoreCommentToggleButton';

export default function Thread() {
    const router = useRouter();
    const thread_id = router.query.id;
    const [state, setState] = useState(false);
    const [content, setContent] = useState('');
    const { data: thread_detail, mutate } = useSWR('/api/thread_detail/' + thread_id, fetcher);
    const { data: user } = useSWR('/api/user', fetcher);
    const { register, handleSubmit, setValue } = useForm<StoreCommentInput>();
    if (!thread_detail || !thread_id) return <BasicLoading />
    setValue('user_id', user.id);
    setValue('thread_id', +thread_id);

    const onSubmit: SubmitHandler<StoreCommentInput> = async (data) => {
        await axiosPost('/api/comment', data);
        setContent('');
        mutate('/api/thread_detail/' + thread_id);
    }

    const toggleDrawer =
        (open: boolean) =>
            (event: KeyboardEvent | MouseEvent) => {
                setState(open);
            };
    
    return (
        <Container sx={{ mt: 10 }}>
            {thread_detail &&
                <ThreadDetail
                    thread={thread_detail.thread}
                    comments={thread_detail.comments}
                />
            }

            <Container sx={{ position: 'fixed', bottom: '5%', left: '80%' }}>
                <StoreCommentToggleButton toggleDrawer={toggleDrawer} />
            </Container>
            <StoreCommentDrawer
                state={state}
                toggleDrawer={toggleDrawer}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                content={content}
                setContent={setContent}
            />
        </Container>
    )
}