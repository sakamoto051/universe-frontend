import { CircularProgress } from '@mui/material'

export const Loading = () => {
    return (
        <CircularProgress
            size={24}
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        />
    )
}