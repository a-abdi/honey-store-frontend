import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";
import type { Product } from "./product.typings";
import type { User } from "./user.typing";

export interface CartOrder {
  product?: string | Product;
  code?: string;
  name?: string;
  imageSrc?: string;
  price?: number;
  discount?: number;
  quantity?: number;
}
export interface OrderTransaction {
  id?: string;
  link?: string;
  cardNo?: string;
  error?: any;
  hashedCardNo?: string;
  status?: number;
  trackId?: number;
  transactionAmount?: number;
  transactionDate?: Date;
  paymentAmount?: number;
  paymentDate?: Date;
  paymentTrackId?: string;
  verifyDate?: Date;
}

export interface Order extends CommonResponseData {
  user: string;
  cart: CartOrder[];
  amount: number;
  orderId: string;
  status: 0 | 1 | 2 | 3 | 4 | 5;
  transaction?: OrderTransaction
}

export interface AdminOrder extends Omit<Order, 'user'> {}
export interface AdminOrder { user: User } 

export interface AdminOrderData {
  data: AdminOrder[] | [];
}

export interface OrderData extends CommonResponseDataOptional {
  data: Order[] | [];
}

export interface OneOrderData extends CommonResponseDataOptional {
  data: Order | null;
}