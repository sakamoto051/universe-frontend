import { CardContent, Typography } from '@mui/material'
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface'

export const CommentCardContent = ({
    comment
}: {
    comment: CommentInterface
}) => {
    return (
        <CardContent>
            <Typography>
                {comment.id} : {comment.created_at}
            </Typography>
            <Typography>
            </Typography>
            <Typography>
                {comment.content}
            </Typography>
        </CardContent>
    )
}