import { Card } from '@mui/material';
import { ThreadInterface } from '../../../interfaces/Thread/ThreadInterface';
import { ThreadCardActions } from '../../atoms/CardActions/ThreadCardActions';
import { ThreadCardContent } from '../../atoms/CardContent/ThreadCardContent';

export const ThreadCard = ({
    thread
}: {
    thread: ThreadInterface
}) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <ThreadCardContent thread={thread} />
            <ThreadCardActions thread={thread} />
        </Card>
    )
}