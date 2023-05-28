import axios from "axios"
import useSWR from 'swr';

export const fetcher = async (url: string) => {
    let cookieValue = '';
    if (document.cookie != undefined) {
        const tmp = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (tmp != undefined) {
            cookieValue = tmp.split('=')[1];
            console.log('value:' + cookieValue);
        }
    }
    const res = await axios(url, {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${cookieValue}`
        }
    })
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        window.location.href = process.env.NEXT_PUBLIC_APP_URL + '/login';
    });
    return res;
}

export const getAuth = () => {
    const { data } = useSWR('/api/user', fetcher);
    return data;
}