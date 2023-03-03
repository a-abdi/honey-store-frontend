import type { AxiosRequestConfig } from 'axios';
import type { AdminLoginData } from '@/typings/adminLoginData.typings';

const BASE_URL = 'http://localhost:3000/';

export const adminLoginConfig = (data: AdminLoginData): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}auth-admin1/login`,
    data
})