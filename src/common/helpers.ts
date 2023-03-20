import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useAdminStore } from '@/stores/admin';
import { SetToken } from './typings/common.typings';

export const sendRequest = async (config: AxiosRequestConfig, setToken: SetToken = SetToken.Default) => {
    switch (setToken) {
        case 'admin':
            const adminStore = useAdminStore();
            if (adminStore.adminData?.access_token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${adminStore.adminData.access_token}`;
            }
            break;
        case 'user':
           
            break;
        default:
            break;
    }
    return (await axios(config)).data;
};

export const getAxiosErrorMessage = (error: any): string => {
    if (Array.isArray(error?.response?.data?.message)) {
        return error.response?.data.message[0];
    }
    if (typeof error?.response?.data.message === 'string') {
        return error.response?.data.message;
    }
    return 'خطایی رخ داده'
};

const PERSIAN_NUMBER = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
export const convertToPersian = (str: string ) =>
{
    for(let i=0; i<10; i++)
    {
        const strNumber: string = `${i}`;
        str = str?.replaceAll(strNumber, PERSIAN_NUMBER[i]);
    }
    
    return str;
};