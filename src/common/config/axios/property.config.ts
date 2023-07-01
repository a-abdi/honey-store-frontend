import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getPropertyListConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}property`,
});

export const getPropertyAxiosConfig = (propertyId: string): AxiosRequestConfig => ({
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