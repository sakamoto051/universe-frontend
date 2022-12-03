import { CardContent, Typography } from '@mui/material'
import { ThreadInterface } from '../../../interfaces/Thread/ThreadInterface'

export const ThreadCardContent = ({
    thread
}: {
    thread: ThreadInterface
}) => {
    return (
        <CardContent>
            <Typography variant="h5" component="div">
                {thread.title}
            </Typography>
            <Typography variant="body2">
                {thread.content}
            </Typography>
        </CardContent>
    )
}