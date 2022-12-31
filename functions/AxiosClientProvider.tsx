import axios from 'axios';

export const axiosGet = async (url: string) => {
    const res = await axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_API_URL + url,
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
        url: process.env.NEXT_PUBLIC_API_URL + url,
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
        url: process.env.NEXT_PUBLIC_SSG_URL + url,
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
        url: process.env.NEXT_PUBLIC_SSG_URL + url,
        data: data,
        withCredentials: true,
    })
        .then(res => res.data)
        .catch(err => {
            throw new Error(err);
        })
    return res;
}

export const axiosLogin = async (url: string, data: Object) => {
    await axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_SSG_URL + '/sanctum/csrf-cookie',
        data: data,
        withCredentials: true,
    })
        .then((res) => {
            axiosPost(url, data);
        }).catch((err) => {
            throw new Error(err);
        });
}
