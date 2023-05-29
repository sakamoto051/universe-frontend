import axios from 'axios';
import { getToken } from './CommonProvider';

export const axiosGet = async (url: string) => {
    const token = getToken();
    const res = await axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_API_URL + url,
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
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
    const token = getToken();
    const res = await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_API_URL + url,
        data: data,
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
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
        data: data,
        withCredentials: true,
    })
        .then(async (res) => {
            const token = await axiosPost('/login', data);
            document.cookie = "token=" + token.token;

            if (document.cookie != undefined) {
                const tmp = document.cookie.split('; ').find(row => row.startsWith('token='));

                if (tmp != undefined) {
                    const cookieValue = tmp.split('=')[1];
                }
            }


        }).catch((err) => {
            console.log(err);
        });

}

// Cookieの値を取得するユーティリティ関数
function getCookieValue(name: any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const poppedValue = parts.pop();
        if (poppedValue) {
            return poppedValue.split(';').shift();
        }
    }
    return undefined;
}
