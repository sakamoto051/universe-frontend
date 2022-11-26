import { Link } from '@mui/material'
import { useRouter } from 'next/router'

export const RegisterLink = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/register');
    }

    return (
        <Link onClick={handleClick} sx={{ cursor: 'pointer' }}>
            to Register
        </Link>
    )
}