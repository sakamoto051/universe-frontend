import { TextField } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { StoreThreadInput } from '../../../interfaces/Comment/StoreThreadInput'
interface Props {
    register: UseFormRegister<StoreThreadInput>
    title: string
    setTitle: Dispatch<SetStateAction<string>>
}

export const StoreThreadTitleTextField: React.FC<Props> = ({ register, title, setTitle }) => {
    return (
        <TextField
            label="Title"
            multiline
            variant="outlined"
            value={title}
            {...register('title')}
            onChange={(e) => setTitle(e.target.value)}
        />
    )
}