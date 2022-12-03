import { Button, CardActions } from '@mui/material';
import { useRouter } from 'next/router';
import { ThreadInterface } from '../../../interfaces/Thread/ThreadInterface';

export const ThreadCardActions = ({
    thread
}: {
    thread: ThreadInterface
}) => {
    const router = useRouter();
    return (
        <CardActions>
            <Button
                size="small"
                onClick={() => {
                    router.push(`thread/${thread.id}`);
                }}
            >
                Show Detail
            </Button>
        </CardActions>
    )
}