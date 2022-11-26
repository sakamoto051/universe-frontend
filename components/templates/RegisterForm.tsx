import { Alert, Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, Link, Stack, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { LoginLink } from '../atoms/Link/LoginLink';
import { RegisterFormValues } from '../../interfaces/RegisterFormValues';
import { RegisterFormRules } from '../../rules/RegisterFormRules';

export default function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit } = useForm<RegisterFormValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        console.log(data);
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/api/user', data, { withCredentials: true })
                .then((res) => console.log(res))
                .catch((error) => {
                    throw new Error(error);
                });
            router.push('/login');
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <>
            <Stack
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                {error && (
                    <Alert severity="error">An error has occurred! Please retry!</Alert>
                )}
                <Controller
                    name='name'
                    control={control}
                    rules={RegisterFormRules.name}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth>
                            <TextField
                                {...field}
                                label="Name"
                                disabled={loading}
                                type='text'
                                error={fieldState.invalid}
                                sx={{ mt: 2 }}
                            />
                            <FormHelperText>{fieldState.error?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name='email'
                    control={control}
                    rules={RegisterFormRules.email}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth>
                            <TextField
                                {...field}
                                label="Email"
                                disabled={loading}
                                error={fieldState.invalid}
                                sx={{ mt: 2 }}
                                type='email'
                            />
                            <FormHelperText>{fieldState.error?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name='password'
                    control={control}
                    rules={RegisterFormRules.password}
                    render={({ field, fieldState }) => (

                        <FormControl variant="outlined">
                            <TextField
                                {...field}
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                error={fieldState.invalid}
                                sx={{ mt: 2 }}
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
                            <FormHelperText>{fieldState.error?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Box sx={{ position: 'relative' }}>
                    <Button
                        sx={{ mt: 2 }}
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        type='submit'
                    >
                        Register
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
                <LoginLink />
            </Stack>
        </>
    )
}