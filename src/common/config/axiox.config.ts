import type { AxiosRequestConfig } from 'axios';
import type { AdminLoginData } from '@/typings/adminLoginData.typings';
import type { CategoryData } from '@/typings/categoryData.typings';

const BASE_URL = 'http://localhost:3000/';

export const adminLoginConfig = (data: AdminLoginData): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}auth-admin1/login`,
    data
});

export const createCategoryConfig = (data: CategoryData): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}category`,
    data
});

export const getCategoryListConfig = (): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}category`,
});