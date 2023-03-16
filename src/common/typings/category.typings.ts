import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";

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

export interface EditCategory {
    id: string,
    newData: Partial<NewCategory>
};