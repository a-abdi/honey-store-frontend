import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

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

