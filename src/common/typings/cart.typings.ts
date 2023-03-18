import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";
import type { ChangeFields } from "./helper.typings";
import type { Product } from './product.typings'

export interface ProductCart {
    name: string;
    price: number;
    discount?: number;
    imageSrc: string;
    quantity: number;
    _id: string;
}

export interface NewCart {
    product: ProductCart;
};

export interface ListProductsCart {
    products: ChangeFields<ProductCart, { _id: string | Product }>[]
};

export interface Cart extends CommonResponseData {
    products: ChangeFields<ProductCart, { _id: string | Product }>[]
};

export interface CartData extends CommonResponseDataOptional {
    data: Cart | null;
};

export interface CartListData extends CommonResponseDataOptional {
    data: Cart[];
};