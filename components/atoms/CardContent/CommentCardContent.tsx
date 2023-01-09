import { CardContent, Link, Tooltip, Typography } from '@mui/material'
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface'

export const CommentCardContent = ({
    comment
}: {
    comment: CommentInterface
}) => {
    const res = comment.content.match(/>+\d{1,3}/g)
    let contents = null;
    let links = new Array();
    if (res) {
        contents = comment.content.split(/>+\d{1,3}/);
        res.forEach((anchor) => {
            links.push('#' + anchor.replace('>>', ''));
        });
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
                            <Link href={links[index - 1]}>
                                <Tooltip title={res[index -1]} placement="top">
                                    <Typography sx={{ display: 'inline' }}>
                                        {res[index - 1]}
                                    </Typography>
                                </Tooltip>
                            </Link>
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