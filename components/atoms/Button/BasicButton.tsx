import { Button } from '@mui/material';

export const BasicButton = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <Button
            variant='contained'
        >
            {children}
        </Button>
    )
}