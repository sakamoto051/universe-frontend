import { List } from '@mui/material'
import { Container, Stack } from '@mui/system'
import { Dispatch, FC, SetStateAction } from 'react'
import { SubmitHandler, UseFormRegister } from 'react-hook-form'
import { StoreCommentInput } from '../../../interfaces/Comment/StoreCommentInput'
import { SubmitButton } from '../../atoms/Button/SubmitButton'
import { StoreCommentTextField } from '../../atoms/TextField/StoreCommentTextField'

interface Props {
    handleSubmit: any
    onSubmit: SubmitHandler<StoreCommentInput>
    register: UseFormRegister<StoreCommentInput>
    content: string
    setContent: Dispatch<SetStateAction<string>>
}

export const StoreCommentForm: FC<Props> = ({ handleSubmit, onSubmit, register, content, setContent }) => {
    return (
        <List>
            <Container>
                <Stack
                    spacing={2}
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <StoreCommentTextField register={register} content={content} setContent={setContent} />
                    <SubmitButton>submit</SubmitButton>
                </Stack>
            </Container>
        </List>
    )
}