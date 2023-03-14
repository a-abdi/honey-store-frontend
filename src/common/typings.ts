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

export interface CommonResponseData {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export interface CommonResponseDataOptional {
    message?: string;
    metaData?: object; 
};

export interface Category extends CommonResponseData, NewCategory {};

export interface CategoryData extends CommonResponseDataOptional {
    data: Category | null;
};

export interface CategoryListData extends CommonResponseDataOptional {
    data: Category[];
};

export interface NewCategory {
    name: string;
    description: string;
};

export interface Page {
    loading?: boolean;
    errorMessage?: null | string;
    successMessage?: null | string;
    message?: string;
    typeMessage?: TypeMessage;
    showMessage?: boolean;
};

export interface EditCategory {
    id: string,
    newData: Partial<NewCategory>
};

export enum TypeMessage {
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
};

export interface NewProduct {
    name: string;
    price: number;
    quantity: number;
    description?: string;
    code: string;
    discount?: number;
    category: string;
};

export interface Product extends Omit<NewProduct, 'category'>, CommonResponseData {
    category: string | Category;
    imageSrc: string;
};

export interface ProductData extends CommonResponseDataOptional {
    data: Product | null;
};

export interface ProductListData extends CommonResponseDataOptional {
    data: Product[];
};