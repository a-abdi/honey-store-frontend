import type { UserData } from './typings/user.typing';

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