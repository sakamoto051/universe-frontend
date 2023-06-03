import { CardContent, Stack, Typography } from '@mui/material'
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface'
import { AnchorTypography } from '../Typography/AnchorTypography'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

export const CommentCardContent = ({
    comment,
    comments,
    anchorFlg = false,
    setShowAnchor,
}: {
    comment: CommentInterface,
    comments: CommentInterface[],
    anchorFlg?: Boolean,
    setShowAnchor?: Dispatch<SetStateAction<Boolean>>,
}) => {
    const targetRef = useRef<HTMLElement>();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const eventTarget = event.target as HTMLElement;
            if (
                targetRef.current
                && !targetRef.current.contains(eventTarget)
                && !(targetRef.current.parentNode === eventTarget.parentNode?.parentNode)
                && anchorFlg
            ) {
                setShowAnchor && setShowAnchor(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const anchorStyle = anchorFlg
        ? {
            border: 'solid 2px #bbb',
            borderRadius: '2px',
            zIndex: 2000,
            position: 'absolute',
            top: '-60%',
            left: '0',
            backgroundColor: '#eee',
            width: '100%',
            hidden: {}
        }
        : { position: 'relative' };

    return (
        <CardContent sx={anchorStyle} ref={targetRef} >
            <Typography>
                {comment.comment_no} : {comment.created_at}
            </Typography>
            <Stack
                style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
            >
                <AnchorTypography comment={comment} comments={comments} ></AnchorTypography>
            </Stack>
        </CardContent>
    )
}