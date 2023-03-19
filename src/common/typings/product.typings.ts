import type { Category } from "./category.typings";
import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";
import type { NoUndefinedField } from "./helper.typings";

export interface NewProduct {
    name: string;
    price: number | null;
    discount?: number| null;
    quantity: number | null;
    description?: string;
    category: string;
};

export interface Product extends Omit<NoUndefinedField<NewProduct>, 'category' | 'file'>, CommonResponseData {
    category: string | Category;
    imageSrc: string;
};

export interface ProductData extends CommonResponseDataOptional {
    data: Product | null;
};

export interface ProductListData extends CommonResponseDataOptional {
    data: Product[];
};

export interface EditProduct {
    id: string;
    data: Partial<NewProduct>;
};