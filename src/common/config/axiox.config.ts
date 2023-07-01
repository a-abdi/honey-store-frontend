import type { AxiosRequestConfig } from 'axios';
import type { EditCategory, NewCategory } from '../typings/category.typings';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const createCategoryConfig = (data: NewCategory): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}categories`,
    data,
});

export const getCategoryConfig = (id: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}categories/${id}`,
});

export const getCategoryListConfig = (filter : string = ''): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}categories${filter}`,
});

export const editCategoryListConfig = (category: EditCategory): AxiosRequestConfig => ({
    method: 'patch',
    url: `${BASE_URL}categories/${category.id}`,
    data: category.newData
});

export const createProductConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}products`,
    data
});

export const getProductListConfig = (filter: string = ''): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}products${filter}`,
});

export const getProductConfig = (id: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}products/${id}`,
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

export const editProductConfig = (productId: string, data: FormData): AxiosRequestConfig => ({
    method: 'patch',
    url: `${BASE_URL}products/${productId}`,
    data
});

export const userSignupConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}users`,
    data
});

export const userLoginConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}auth/login`,
    data
});

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

export const getProperyListConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}property`,
});

export const getProperyAxiosConfig = (propertyId: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}property/${propertyId}`,
});

export const deletePropertyConfig = (propertyId: string): AxiosRequestConfig => ({
    method: 'delete',
    url: `${BASE_URL}property/${propertyId}`,
});

export const createPropertyAxiosConfig = <T>(data: T): AxiosRequestConfig<T> => ({
    method: 'post',
    url: `${BASE_URL}property`,
    data
});

export const updatePropertyAxiosConfig = <T>(propertyId: string, data: T): AxiosRequestConfig<T> => ({
    method: 'patch',
    url: `${BASE_URL}property/${propertyId}`,
    data
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


