import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";
import type { Property } from "./property.typing";

export interface NewCategory {
    name: string;
    description: string;
    properties: string[];
};

export interface Category extends CommonResponseData, Omit<NewCategory, 'properties'> {
    properties: Property[];
};

export interface CategoryData extends CommonResponseDataOptional {
    data: Category | null;
};

export interface CategoryListData extends CommonResponseDataOptional {
    data: Category[] | [];
};


export interface EditCategory {
    id: string,
    newData: Partial<NewCategory>
};