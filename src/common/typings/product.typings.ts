import type { Category } from "./category.typings";
import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";

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