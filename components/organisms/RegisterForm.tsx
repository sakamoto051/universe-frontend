import { Alert, Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Test from '../../pages/test';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

export default function RegisterForm() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleUserDataChange = (e: any) => {
        setUserData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    async function submitClick() {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/api/user', userData)
                .then((res) => console.log(res));
            router.push('/test');
        } catch (e) {
            setError(true);
            setLoading(false);
        }

    }

    return (
        <>
            {error && (
                <Alert severity="error">An error has occurred! Please retry!</Alert>
            )}

            <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
                <TextField
                    label="Name"
                    variant="outlined"
                    name='name'
                    value={userData.name}
                    onChange={handleUserDataChange}
                    disabled={loading}
                    required
                    type='text'
                />
            </FormControl>

            <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
                <TextField
                    label="Email"
                    variant="outlined"
                    name='email'
                    value={userData.email}
                    onChange={handleUserDataChange}
                    disabled={loading}
                />
            </FormControl>
            
            <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    type={values.showPassword ? 'text' : 'password'}
                    value={userData.password}
                    name='password'
                    onChange={handleUserDataChange}
                    disabled={loading}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                disabled={loading}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>

            <Box sx={{ position: 'relative' }}>
                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    fullWidth
                    onClick={submitClick}
                    disabled={loading}
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
        </>
    )
}