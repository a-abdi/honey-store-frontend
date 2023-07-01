import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const createCategoryConfig = <T>(data: T): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}categories`,
    data,
});

export const editCategoryListConfig = <T>(data: T, id: string): AxiosRequestConfig => ({
    method: 'patch',
    url: `${BASE_URL}categories/${id}`,
    data
});
