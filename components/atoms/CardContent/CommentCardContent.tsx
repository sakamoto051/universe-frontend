import { CardContent, Tooltip, Typography } from '@mui/material'
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface'

export const CommentCardContent = ({
    comment
}: {
    comment: CommentInterface
}) => {
    const res = comment.content.match(/>+\d{1,3}/g)
    let contents = null;
    if (res) {
        contents = comment.content.split(/>+\d{1,3}/);
    }
    return (
        <CardContent>
            <Typography>
                {comment.comment_no} : {comment.created_at}
            </Typography>
            <Typography
                style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
                
            >
                {(res && contents) ? contents.map((content, index) => {
                    return (
                        <Typography>
                            <Tooltip title={res[index -1]} placement="top">
                                <Typography sx={{ display: 'inline' }}>
                                    {res[index - 1]}
                                </Typography>
                            </Tooltip>
                            {content}
                        </Typography>
                    )
                }) :
                    comment.content
                }
            </Typography>
        </CardContent>
    )
}