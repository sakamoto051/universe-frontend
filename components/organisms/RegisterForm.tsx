import { Alert, Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm, Controller} from 'react-hook-form';

interface RegisterFormInput {
    name: string
    email: string
    password: string
}

export default function RegisterForm() {

    const router = useRouter();

    const { control, handleSubmit } = useForm<RegisterFormInput>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const validationRules = {
        name: {
            required: 'Please enter name.',
            maxLength: { value: 128, message: 'Please enter passowrd at most 128 characters.'},
        },
        email: {
            required: 'Please enter email.',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email',
            },
        },
        password: {
            required: 'Please enter password.',
            minLength: { value: 8, message: 'Please enter passowrd at least 8 characters.' },
            pattern: {
                value: /[A-Z0-9]/,
                message: 'Please enter with half-width alphanumeric characters.',
            },
        },
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/api/user', data)
                .then((res) => console.log(res))
                .catch((error) => {
                    throw new Error(error);
                });
            router.push('/test');
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
                    rules={validationRules.name}
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
                    rules={validationRules.email}
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
                    rules={validationRules.password}
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
            </Stack>
        </>
    )
}