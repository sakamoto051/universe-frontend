import axios from "axios"
import useSWR from 'swr';

export const fetcher = async (url: string) => {
    await axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_API_URL + '/sanctum/csrf-cookie',
        withCredentials: true,
    })
        .then(async () => {
            const res = await axios(url, {
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                withCredentials: true,
            })
                .then(res => res.data)
                .catch(err => {
                    console.log(err);
                    window.location.href = process.env.NEXT_PUBLIC_APP_URL + '/login';
                });
            return res;
        });
}

export const getAuth = () => {
    const { data } = useSWR('/api/user', fetcher);
    return data;
}