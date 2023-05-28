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

export const axiosLogin = async (datas: Object) => {
    const { data } = await axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_API_URL + '/sanctum/csrf-cookie',
        data: datas,
        withCredentials: true,
    })
        // .then(async (res) => {
        //     console.log(res);
        //     // await axiosPost('/login', data);
        // }).catch((err) => {
        //     console.log(err);
        // });
    
    console.log(data);
}
