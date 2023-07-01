import type { AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;





export const updateUserConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'patch',
    url: `${BASE_URL}users`,
    data
});

export const updateUserPasswordConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'patch',
    url: `${BASE_URL}users/password`,
    data
});

export const getUserConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}users/info`,
});

export const paymentConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}checkout/payment`,
});

export const getOrdersAxiosConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}user/orders`,
});

export const getOrdersBystatusAxiosConfig = (status: number): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}orders?status=${status}`,
});

export const getOneOrdersAxiosConfig = (orderId: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}orders/${orderId}`,
});

export const updateOrderStatusAxiosConfig = <T>(orderId: string, data: T): AxiosRequestConfig<T> => ({
    method: 'patch',
    url: `${BASE_URL}orders/${orderId}`,
    data
});

export const getCommentListAxiosConfig = (productId: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}product/${productId}/comment`,
});

export const createCommentAxiosConfig = <T>(productId: string, data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}product/${productId}/comment`,
    data
});

export const getCommentListNotVerifyAxiosConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}product/comment/not-verify`,
});

export const updateCommentAdminAxiosConfig = (productId: string, commentId: string): AxiosRequestConfig => ({
    method: 'patch',
    url: `${BASE_URL}product/${productId}/comment/${commentId}/admin`,
});

export const deleteCommentAdminAxiosConfig = (productId: string, commentId: string): AxiosRequestConfig => ({
    method: 'delete',
    url: `${BASE_URL}product/${productId}/comment/${commentId}/admin`,
});

export const getUsersCommentAxios = (productId: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}product/${productId}/user/comment`,
});

export const deleteUsersCommentAxios = (productId: string, commentId: string): AxiosRequestConfig => ({
    method: 'delete',
    url: `${BASE_URL}product/${productId}/comment/${commentId}`,
});

export const updateUserCommentAxios = <T>(productId: string, commentId: string, data: T): AxiosRequestConfig<T> => ({
    method: 'patch',
    url: `${BASE_URL}product/${productId}/comment/${commentId}`,
    data
});


