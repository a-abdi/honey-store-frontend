import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const addToCartConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}carts/products`,
    data
});

export const getCartConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}carts`,
});

export const updateCartConfig = <T>(productId: string, data: T): AxiosRequestConfig<T> => ({
    method: 'patch',
    url: `${BASE_URL}carts/products/${productId}`,
    data
});

export const removeProductFromCartConfig = (productId: string): AxiosRequestConfig => ({
    method: 'delete',
    url: `${BASE_URL}carts/products/${productId}`,
});