import { useState } from 'react';
import { CommentCardContent } from '../CardContent/CommentCardContent';
import { CommentInterface } from '../../../interfaces/Comment/CommnetInterface';

export const AnchorTypography = ({
    comment,
    comments,
}: {
    comment: CommentInterface,
    comments: CommentInterface[],
}) => {
    const [anchorComment, setAnchorComment] = useState<CommentInterface>();
    const [showAnchor, setShowAnchor] = useState<Boolean>(false);

    const handleClick = (anchorId: number) => {
        setAnchorComment(comments[anchorId - 1]);
        setShowAnchor(true);
    };

    const renderText = () => {
        const children = comment.content;
        const anchorRegex = />>(\d+)/g;
        const parts = children.split(anchorRegex);

        return parts.map((textPart: string, index: number) => {
            if (index % 2 === 0) {
                return textPart;
            } else {
                return (
                    <span
                        key={textPart}
                        onClick={() => handleClick(parseInt(textPart))}
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        {`>>${textPart}`}
                    </span>
                )
            }
        });
    };

    return (
        <>
            {showAnchor && anchorComment &&
                <CommentCardContent
                    comment={anchorComment}
                    comments={comments}
                    anchorFlg={true}
                    setShowAnchor={setShowAnchor}
                />
            }
            <div>{renderText()}</div>
        </>
    );
}