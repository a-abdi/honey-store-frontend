import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getOrdersBystatusAxiosConfig = (status: number): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}orders?status=${status}`,
});

export const updateOrderStatusAxiosConfig = <T>(orderId: string, data: T): AxiosRequestConfig<T> => ({
    method: 'patch',
    url: `${BASE_URL}orders/${orderId}`,
    data
});
