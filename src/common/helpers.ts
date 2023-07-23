import type { UserData } from './typings/user.typing';

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