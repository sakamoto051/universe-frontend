import { Drawer } from '@mui/material'
import { Dispatch, FC, SetStateAction } from 'react'
import { SubmitHandler, UseFormRegister } from 'react-hook-form'
import { StoreCommentInput } from '../../interfaces/Comment/StoreCommentInput'
import { StoreCommentForm } from '../molecules/Form/StoreCommentForm'

interface Props {
    state: boolean
    toggleDrawer: any
    handleSubmit: any
    onSubmit: SubmitHandler<StoreCommentInput>
    register: UseFormRegister<StoreCommentInput>
    content: string
    setContent: Dispatch<SetStateAction<string>>
}

export const StoreCommentDrawer: FC<Props> = ({
    state,
    toggleDrawer,
    handleSubmit,
    onSubmit,
    register,
    content,
    setContent,
}) => {
    return (
        <Drawer
            anchor={'bottom'}
            open={state}
            onClose={toggleDrawer(false)}
        >
            <StoreCommentForm
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                content={content}
                setContent={setContent}
            />
        </Drawer>
    )
}