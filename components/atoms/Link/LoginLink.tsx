import { Link } from '@mui/material'
import { useRouter } from 'next/router'

export const LoginLink = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/login');
    }

    return (
        <Link onClick={handleClick} sx={{ cursor: 'pointer' }}>
            to Login
        </Link>
    )
}