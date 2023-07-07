import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useAdminStore } from '@/stores/admin';
import { SetToken } from './typings/common.typings';
import { useUserStore } from '@/stores/user';
import type { UserData } from './typings/user.typing';

export const sendRequest = async (config: AxiosRequestConfig, setToken: SetToken = SetToken.Default) => {
    switch (setToken) {
        case 'admin': {
            const adminStore = useAdminStore();
            if (adminStore.adminData?.data?.access_token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${adminStore.adminData.data.access_token}`;
            }
            break;
        }
        case 'user': {
            const userStore = useUserStore();
            if (userStore.userLoginData?.data?.access_token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${userStore.userLoginData.data.access_token}`;
            }
            break;
        }
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
    if (typeof error?.response?.data.Message === 'string') {
        return error.response?.data.Message;
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

export const createCode = () => {
    return (Math.random() + 1).toString(36).substring(2);
};

export const getFullName = (user: UserData) => {
    if (user.data?.firstName && user.data?.lastName) {
        return `${user.data?.firstName} ${user.data?.lastName}`
    }
    if (user.data?.firstName) {
        return `${user.data?.firstName}`
    }
    if (user.data?.lastName) {
        return `${user.data.lastName}`
    }
    return 'کاربر';
};

export const getDate = (timestamp: Date) => {
    return new Date(timestamp).toLocaleDateString('fa-IR').replace(/\//g, '-');
};