import type { AxiosRequestConfig } from 'axios';
import type { AdminLoginData } from '@/typings/adminLoginData.typings';
import type { Category } from '@/typings/category.typings';

const BASE_URL = 'http://localhost:3000/';

export const adminLoginConfig = (data: AdminLoginData): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}auth-admin1/login`,
    data
});

export const createCategoryConfig = (data: Category): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}category`,
    data
});