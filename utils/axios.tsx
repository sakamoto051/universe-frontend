import axios from 'axios';
import { BASE_URL, SSG_URL } from '../env';

export const axiosGet = async (url: string) => {
    const res = await axios({
        method: 'get',
        url: BASE_URL + url,
        withCredentials: true,
    })
        .then(res => res.data)
        .catch(err => {
            throw new Error(err);
        })
    return res;
}

export const axiosPost = async (url: string, data: Object) => {
    const res = await axios({
        method: 'post',
        url: BASE_URL + url,
        data: data,
        withCredentials: true,
    })
        .then(res => res.data)
        .catch(err => {
            throw new Error(err);
        })
    return res;
}

export const axiosGetSSG = async (url: string) => {
    const res = await axios({
        method: 'get',
        url: SSG_URL + url,
        withCredentials: true,
    })
        .then(res => res.data)
        .catch(err => {
            throw new Error(err);
        })
    return res;
}

export const axiosPostSSG = async (url: string, data: Object) => {
    const res = await axios({
        method: 'post',
        url: SSG_URL + url,
        data: data,
        withCredentials: true,
    })
        .then(res => res.data)
        .catch(err => {
            throw new Error(err);
        })
    return res;
}
