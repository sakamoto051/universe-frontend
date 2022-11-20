import { Button, Container, Input, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Thread() {

    const router = useRouter();

    const id = router.query.id;

    return (
        <>
            <Container sx={{ mt: 10 }}>
                <Typography>
                    id = {id}
                </Typography>
                <Typography>
                    id = {id}
                </Typography>
                <Typography>
                    id = {id}
                </Typography>
            </Container>
        </>
    )
}
