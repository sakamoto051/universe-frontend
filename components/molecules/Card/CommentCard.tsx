import { Card } from '@mui/material';
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface';
import { CommentCardContent } from '../../atoms/CardContent/CommentCardContent';

export const CommentCard = ({
    comment,
    comments,
}: {
    comment: CommentInterface
    comments: CommentInterface[]
}) => {
    return (
        <Card key={comment.comment_no} sx={{ overflow: 'visible' }}>
            <CommentCardContent comment={comment} comments={comments} />
        </Card>
    )
}