import { CardContent } from '@mui/material'
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface'

export const CommentCardContent = ({
    comment
}: {
    comment: CommentInterface
}) => {
    return (
        <CardContent>
            {comment.content}
        </CardContent>
    )
}