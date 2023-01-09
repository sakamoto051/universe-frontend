import { Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import useSWR from 'swr';
import { BasicLoading } from '../components/atoms/Loading/BasicLoading';
import { ThreadCard } from '../components/molecules/Card/ThreadCard';
import { fetcher } from '../functions/CommonProvider';
import { ThreadInterface } from '../interfaces/Thread/ThreadInterface';

export default function Home() {
	const { data: user } = useSWR('/api/user', fetcher, {
		fallbackData: { id: 0 },
	});
	const { data: threads } = useSWR('/api/my_thread/' + user.id, fetcher);
	if (!user || !threads) return <BasicLoading />

	return (
		<Container sx={{ mt: 2 }}>
			<Stack spacing={2} sx={{ mb: 2 }}>
				<Typography variant='h5'>My Threads</Typography>
				{threads.map((thread: ThreadInterface) => {
					return <ThreadCard thread={thread} key={thread.id} />
				})}
			</Stack>
		</Container>
	)
}
