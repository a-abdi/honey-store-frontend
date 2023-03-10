import type { AxiosError } from "axios";

export interface Admin {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
};

export interface AdminData {
    access_token: string;
};

export interface AdminLoginData {
    phoneNumber: string | null;
    password: string | null;
};

export interface Category {
    name: string;
    description: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export interface CategoryData {
    data: Category;
    message?: string;
    metaData?: object; 
};

export interface CategoryListData {
    data: Category[];
    message?: string;
    metaData?: object; 
};

export interface NewCategory {
    name: string;
    description: string;
};

export interface Form {
    loading?: boolean;
    error?:  null | AxiosError;
    success?: null | object;
};