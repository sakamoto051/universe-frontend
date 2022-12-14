import { Alert, Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { LoginLink } from '../atoms/Link/LoginLink';
import { RegisterFormValues } from '../../interfaces/RegisterFormValues';
import { RegisterFormRules } from '../../rules/RegisterFormRules';
import { axiosPost } from '../../functions/AxiosClientProvider';

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
        try {
            setLoading(true);
            await axiosPost('/api/user', data);
            router.push('/login');
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
            console.log(err);
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