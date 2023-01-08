import { TextField } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { StoreThreadInput } from '../../../interfaces/Comment/StoreThreadInput'
interface Props {
    register: UseFormRegister<StoreThreadInput>
    content: string
    setContent: Dispatch<SetStateAction<string>>
}

export const StoreThreadContentTextField: React.FC<Props> = ({register, content, setContent}) => {
    return (
        <TextField
            label="Content"
            multiline
            rows={10}
            variant="outlined"
            value={content}
            {...register('content')}
            onChange={(e) => setContent(e.target.value)}
        />
    )
}