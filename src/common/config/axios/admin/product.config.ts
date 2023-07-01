import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const createProductConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}products`,
    data
});

export const deleteProductConfig = (id: string): AxiosRequestConfig => ({
    method: 'delete',
    url: `${BASE_URL}products/${id}`,
});

export const safeDeleteProductConfig = (id: string): AxiosRequestConfig => ({
    method: 'patch',
    url: `${BASE_URL}products/${id}/safe-delete`,
});

export const restoreProductConfig = (id: string): AxiosRequestConfig => ({
    method: 'patch',
    url: `${BASE_URL}products/${id}/restore`,
});

export const editProductConfig = <T>(productId: string, data: T): AxiosRequestConfig => ({
    method: 'patch',
    url: `${BASE_URL}products/${productId}`,
    data
});
