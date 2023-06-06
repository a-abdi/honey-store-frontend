import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";
import type { NoUndefinedField } from "./helper.typings";
import type { User } from "./user.typing";

export interface CartOrder {
  productId?: string;
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
  status: 0 | 1 | 2 | 3 | 4 | 5;
  transaction?: OrderTransaction
}

export interface AdminOrderData {
  data: (Omit<Order, 'user'> & {user: NoUndefinedField<User>})[] | [];
}

export interface OrderData extends CommonResponseDataOptional {
  data: Order[] | [];
}