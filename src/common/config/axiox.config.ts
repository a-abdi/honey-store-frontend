import type { AxiosRequestConfig } from 'axios';
import type { AdminLoginData, NewCategory } from '../typings';

const BASE_URL = 'http://localhost:3000/';

export const adminLoginConfig = (data: AdminLoginData): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}auth-admin/login`,
    data
});

export const createCategoryConfig = (data: NewCategory): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}categories`,
    data,
});

export const getCategoryListConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}categories`,
});