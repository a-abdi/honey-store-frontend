import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";

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
  code: string;
  status: number;
  transaction?: OrderTransaction
}

export interface OrderData extends CommonResponseDataOptional {
  data: Order[] | [];
}