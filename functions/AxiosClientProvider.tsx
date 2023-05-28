import axios from 'axios';

export const axiosGet = async (url: string) => {
    const res = await axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_API_URL + url,
        withCredentials: true,
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
            console.log(getCookieValue('XSRF-TOKEN'));
            console.log(res);
            await axiosPost('/login', data);
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
