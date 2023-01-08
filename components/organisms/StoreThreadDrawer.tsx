import { Drawer } from '@mui/material'
import { Dispatch, FC, SetStateAction } from 'react'
import { SubmitHandler, UseFormRegister } from 'react-hook-form'
import { StoreThreadInput } from '../../interfaces/Comment/StoreThreadInput'
import { StoreThreadForm } from '../molecules/Form/StoreThreadForm'

interface Props {
    state: boolean
    toggleDrawer: any
    handleSubmit: any
    onSubmit: SubmitHandler<StoreThreadInput>
    register: UseFormRegister<StoreThreadInput>
    title: string
    content: string
    setTitle: Dispatch<SetStateAction<string>>
    setContent: Dispatch<SetStateAction<string>>
}

export const StoreThreadDrawer: FC<Props> = ({
    state,
    toggleDrawer,
    handleSubmit,
    onSubmit,
    register,
    title,
    content,
    setTitle,
    setContent,
}) => {
    return (
        <Drawer
            anchor={'bottom'}
            open={state}
            onClose={toggleDrawer(false)}
        >
            <StoreThreadForm
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
            />
        </Drawer>
    )
}