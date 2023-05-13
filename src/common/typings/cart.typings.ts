import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";
import type { ChangeFields } from "./helper.typings";
import type { Product } from './product.typings';

// export interface ProductCart {
//     name: string;
//     price: number;
//     discount?: number;
//     imageSrc: string;
//     quantity: number;
//     _id: string;
// };

export interface NewProductCart {
    quantity: number;
    _id: string;
};

export interface ProductCart {
    quantity: number;
    product: Product;
};

export interface ListProductsCart {
    products: ProductCart[];
};

export interface Cart extends CommonResponseData {
    products: ProductCart[];
};

export interface CartData extends CommonResponseDataOptional {
    data: Cart | null;
};

export interface CartListData extends CommonResponseDataOptional {
    data: Cart[];
};