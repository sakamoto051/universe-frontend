import { Alert, Box, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterLink } from '../atoms/Link/RegisterLink';
import { LoginFormValues } from '../../interfaces/LoginFormValues';
import { LoginFormRules } from '../../rules/LoginFormRules';
import { axiosLogin } from '../../functions/AxiosClientProvider';

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<LoginFormValues>();
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        await axiosLogin(data);
        // await router.push('/thread');
    }

    return (
        <>
            <Stack
                spacing={2}
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                {error && (
                    <Alert severity="error">An error has occurred! Please retry!</Alert>
                )}

                <TextField
                    {...register('email')}
                    label='Email'
                    type='email'
                    inputProps={LoginFormRules.email}
                />

                <TextField
                    {...register('password')}
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    inputProps={LoginFormRules.password}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}
                />

                <Box sx={{ position: 'relative' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        type='submit'
                    >
                        Login
                    </Button>
                </Box>
                <RegisterLink />
            </Stack>
        </>
    )
}