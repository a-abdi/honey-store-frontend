import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const sendVerifyCodeSmsConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}auth/login/sendsms`,
    data
});

export const verifyCodeConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}auth/login/verifycode`,
    data
});

export const userLoginConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}auth/login`,
    data
});

export const updateUserConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'patch',
    url: `${BASE_URL}users`,
    data
});

export const updateUserPasswordConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'patch',
    url: `${BASE_URL}users/password`,
    data
});

export const getUserConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}users/info`,
});
