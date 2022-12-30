import { Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { CommentInterface } from '../../interfaces/Comment/CommnetInterface'
import { ThreadInterface } from '../../interfaces/Thread/ThreadInterface'
import { CommentCard } from '../molecules/Card/CommentCard'

export const ThreadDetail = ({
    thread,
    comments,
}: {
    thread: ThreadInterface,
    comments: CommentInterface[],
}) => {
    return (
        <Stack spacing={1}>
            <Typography variant='h2'>
                {thread.title}
            </Typography>
            {comments && comments.map((comment: CommentInterface) => {
                return (
                    <CommentCard comment={comment} key={comment.id} />
                )
            })}
        </Stack>
    )
}