import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getUserListConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}users`,
});
