import type { Category } from "./category.typings";
import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";

export interface newProperty {
    label: string;
    type: string;
    unit: string[];
    category?: string[];
};

export interface Property extends Omit<newProperty, 'category'>, CommonResponseData {
    category: string | Category;
};

export interface PropertyData extends CommonResponseDataOptional {
    data: Property | null;
};

export interface PropertyListData extends CommonResponseDataOptional {
    data: Property[] | [];
};