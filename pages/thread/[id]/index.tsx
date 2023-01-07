import { Button, Container, Drawer, List, Stack, TextField } from '@mui/material';
import { ThreadDetail } from '../../../components/organisms/ThreadDetail';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../../functions/CommonProvider';
import { BasicLoading } from '../../../components/atoms/Loading/BasicLoading';
import React, { useState } from 'react';

export default function Thread() {
    const router = useRouter();
    const thread_id = router.query.id;
    const [state, setState] = useState(false);
    const { data } = useSWR('/api/thread_detail/' + thread_id, fetcher);
    if (!data) return <BasicLoading />

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                setState(open);
            };
    
    return (
        <Container sx={{ mt: 10 }}>
            <ThreadDetail thread={data.thread} comments={data.comments} />

            <Container sx={{ position: 'fixed', bottom: '5%', left: '80%' }}>
                <Button variant='contained' onClick={toggleDrawer(true)}>
                    COMMENT
                </Button>
            </Container>
            <Drawer
                anchor={'bottom'}
                open={state}
                onClose={toggleDrawer(false)}
            >
            <List>
                <Container>
                    <Stack
                        spacing={2}
                        component='form'
                    // onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField
                            label="Content"
                            multiline
                            rows={10}
                            variant="outlined"
                        // {...register('content')}
                        />

                        <Button
                            type='submit'
                            variant='contained'
                        >
                            COMMENT
                        </Button>
                    </Stack>
                </Container>
            </List>
            </Drawer>
        </Container>
    )
}