import type { AxiosRequestConfig } from 'axios';
import type { AdminLoginData } from '../typings/admin.typings';
import type { EditCategory, NewCategory } from '../typings/category.typings';

const BASE_URL = 'http://localhost:3000/';

export const adminLoginConfig = (data: AdminLoginData): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}auth-admin/login`,
    data
});

export const createCategoryConfig = (data: NewCategory): AxiosRequestConfig => ({
    method: 'post',
    url: `${BASE_URL}categories`,
    data,
});

export const getCategoryConfig = (id: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}categories/${id}`,
});

export const getCategoryListConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}categories`,
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

export const getProductListConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}products`,
});

export const getProductConfig = (id: string): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}products/${id}`,
});

export const deleteProductConfig = (id: string): AxiosRequestConfig => ({
    method: 'delete',
    url: `${BASE_URL}products/${id}`,
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