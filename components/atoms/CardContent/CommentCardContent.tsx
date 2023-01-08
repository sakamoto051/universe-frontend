import { CardContent, Typography } from '@mui/material'
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface'

export const CommentCardContent = ({
    comment
}: {
    comment: CommentInterface
}) => {
    console.log(comment);
    return (
        <CardContent>
            <Typography>
                {comment.comment_no} : {comment.created_at}
            </Typography>
            <Typography>
                {comment.content}
            </Typography>
        </CardContent>
    )
}