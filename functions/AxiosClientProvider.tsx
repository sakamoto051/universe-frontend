import axios from 'axios';
import { getToken } from './CommonProvider';

export const axiosGet = async (url: string) => {
    const res = await axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_API_URL + url,
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
    return res;
}

export const axiosPost = async (url: string, data: Object) => {
    const res = await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_API_URL + url,
        data: data,
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
    return res;
}

export const axiosLogin = async (data: Object) => {
    await axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_API_URL + '/sanctum/csrf-cookie',
        withCredentials: true,
    });
    const res = await axiosPost('/login', data);
    document.cookie = "token=" + res.token;
}
