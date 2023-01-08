import { Button } from '@mui/material'
import { FC } from 'react'

interface Props {
    toggleDrawer: any
}

export const StoreThreadToggleButton: FC<Props> = ({toggleDrawer}) => {
    return (
        <Button variant='contained' onClick={toggleDrawer(true)}>
            THREAD
        </Button>
    )
}