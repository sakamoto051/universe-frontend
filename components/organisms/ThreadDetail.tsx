import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { CommentInterface } from '../../interfaces/Comment/CommnetInterface'
import { ThreadInterface } from '../../interfaces/Thread/ThreadInterface'
import { BasicLoading } from '../atoms/Loading/BasicLoading'
import { CommentCard } from '../molecules/Card/CommentCard'

export const ThreadDetail = ({
    thread,
    comments,
}: {
    thread: ThreadInterface,
    comments: CommentInterface[],
}) => {
    if (!thread || !comments) return <BasicLoading />
    return (
        <Stack spacing={1} sx={{ mb: 2 }}>
            <Typography variant='h5'>
                {thread.title}
            </Typography>
            {comments.map((comment: CommentInterface) => {
                return (
                    <CommentCard comment={comment} key={comment.id} comments={comments}/>
                )
            })}
        </Stack>
    )
}