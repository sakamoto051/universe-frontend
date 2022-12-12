import { Container } from '@mui/material';
import { ThreadDetail } from '../../../components/organisms/ThreadDetail';
import { ThreadInterface } from '../../../interfaces/Thread/ThreadInterface';
import { axiosGetSSG, axiosPostSSG } from '../../../functions/AxiosClientProvider';

export default function Thread(props: any) {
    let { thread, comments } = props.data
    console.log(thread);
    return (
        <Container sx={{ mt: 10 }}>
            {thread && (
                <ThreadDetail thread={thread} comments={comments} />
            )}
        </Container>
    )
}

export async function getStaticPaths() {
    const threads = await axiosGetSSG('/api/thread');
    const paths = threads.map((thread: ThreadInterface) => {
        return {
            params: { id: thread.id.toString() }
        }
    });
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    // const thread = await axiosGetSSG(`/api/thread/${params.id}`);
    const data = await axiosPostSSG('/api/thread_detail', { thread_id: params.id });
    return {
        props: {
            data,
            // comments,
        }
    }
}