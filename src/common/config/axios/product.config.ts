import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getProductListConfig = (filter: string = ''): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}products${filter}`,
});

export const getProductConfig = (id: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}products/${id}`,
});

