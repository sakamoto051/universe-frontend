import { Alert, Box, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterLink } from '../atoms/Link/RegisterLink';
import { LoginFormValues } from '../../interfaces/LoginFormValues';
import { LoginFormRules } from '../../rules/LoginFormRules';
import { Loading } from '../atoms/Loading';

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<LoginFormValues>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        setLoading(true);
        try {
            axios.get('http://localhost:8081/sanctum/csrf-cookie', { withCredentials: true }).then(response => {
                // ログイン処理を実装する
                axios.post(
                    'http://localhost:8081/login',
                    data,
                    { withCredentials: true }
                ).then((response) => {
                    router.push('/thread');
                });
            });
        } catch (error) {
            setError(true);
            setLoading(false);
        }
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
                    disabled={loading}
                    inputProps={LoginFormRules.email}
                />

                <TextField
                    {...register('password')}
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    disabled={loading}
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
                        disabled={loading}
                        type='submit'
                    >
                        Login
                    </Button>
                    {loading && <Loading />}
                </Box>
                <RegisterLink />
            </Stack>
        </>
    )
}