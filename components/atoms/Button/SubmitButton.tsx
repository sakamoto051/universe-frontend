import { Button } from '@mui/material'
import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export const SubmitButton: FC<Props> = ({children}) => {
    return (
        <Button
            type='submit'
            variant='contained'
        >
            {children}
        </Button>
    )
}