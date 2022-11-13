import { Alert, Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

interface LoginFormInput {
    email: string
    password: string
}

export default function LoginForm() {

    const router = useRouter();

    const { register, handleSubmit } = useForm<LoginFormInput>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const validationRules = {
        email: {
            required: true,
        },
        password: {
            required: true,
            minLength: 8,
            maxLength: 32,
        },
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/api/login', data)
                .then((res) => console.log(res))
                .catch((error) => {
                    throw new Error(error);
                });
            router.push('/board');
        } catch (error) {
            console.log(error);
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
                    inputProps={validationRules.email}
                />

                <TextField
                    {...register('password')}
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    disabled={loading}
                    inputProps={validationRules.password}
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
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    )}
                </Box>
            </Stack>
        </>
    )
}