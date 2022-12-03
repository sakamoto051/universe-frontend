import { Card } from '@mui/material';
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface';
import { CommentCardContent } from '../../atoms/CardContent/CommentCardContent';

export const CommentCard = ({
    comment
}: {
    comment: CommentInterface
}) => {
    return (
        <Card>
            <CommentCardContent comment={comment} />
        </Card>
    )
}