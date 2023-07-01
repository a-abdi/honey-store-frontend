import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getCommentListAxiosConfig = (productId: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}product/${productId}/comment`,
});

export const createCommentAxiosConfig = <T>(productId: string, data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}product/${productId}/comment`,
    data
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

