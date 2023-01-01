import { Container } from '@mui/material';
import { ThreadDetail } from '../../../components/organisms/ThreadDetail';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../../functions/CommonProvider';
import { BasicLoading } from '../../../components/atoms/Loading/BasicLoading';
    
export default function Thread() {
    const router = useRouter();
    const thread_id = router.query.id;

    const { data, error, isLoading } = useSWR('/api/thread_detail/' + thread_id, fetcher);
    if (!data) return <BasicLoading /> 
    
    return (
        <Container sx={{ mt: 10 }}>
            <ThreadDetail thread={data.thread} comments={data.comments} />
        </Container>
    )
}