import { Card } from '@mui/material';
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface';
import { CommentCardContent } from '../../atoms/CardContent/CommentCardContent';

export const CommentCard = ({
    comment
}: {
    comment: CommentInterface
}) => {
    return (
        <Card id={comment.id}>
            <CommentCardContent comment={comment} />
        </Card>
    )
}