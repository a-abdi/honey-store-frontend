import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const adminLoginConfig = <T>(data: T): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}auth-admin/login`,
    data
});