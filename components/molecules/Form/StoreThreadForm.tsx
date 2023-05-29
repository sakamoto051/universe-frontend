import { List } from '@mui/material'
import { Container, Stack } from '@mui/system'
import { Dispatch, FC, SetStateAction } from 'react'
import { SubmitHandler, UseFormRegister } from 'react-hook-form'
import { StoreThreadInput } from '../../../interfaces/Comment/StoreThreadInput'
import { SubmitButton } from '../../atoms/Button/SubmitButton'
import { StoreThreadContentTextField } from '../../atoms/TextField/StoreThreadContentTextField'
import { StoreThreadTitleTextField } from '../../atoms/TextField/StoreThreadTitleTextField'
import { CSRFToken } from '../../atoms/CSRFToken'

interface Props {
    handleSubmit: any
    onSubmit: SubmitHandler<StoreThreadInput>
    register: UseFormRegister<StoreThreadInput>
    title: string
    content: string
    setTitle: Dispatch<SetStateAction<string>>
    setContent: Dispatch<SetStateAction<string>>
}

export const StoreThreadForm: FC<Props> = ({
    handleSubmit,
    onSubmit,
    register,
    title,
    content,
    setTitle,
    setContent,
}) => {
    return (
        <List>
            <Container>
                <Stack
                    spacing={2}
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CSRFToken />
                    <StoreThreadTitleTextField register={register} title={title} setTitle={setTitle} />
                    <StoreThreadContentTextField register={register} content={content} setContent={setContent} />
                    <SubmitButton>submit</SubmitButton>
                </Stack>
            </Container>
        </List>
    )
}