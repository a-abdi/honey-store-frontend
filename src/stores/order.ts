import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from "@/common/typings/common.typings";
import type { AdminOrderData, OneOrderData, OrderData } from "@/common/typings/order.typings";

export const useOrderStore = defineStore("order", {
    state: () => {
        return {
            transactionLink: null as string | null,
            orderData: null as OrderData | null,
            adminOrderData: null as AdminOrderData | null,
            oneOrderData: null as OneOrderData | null
        }
    },

    actions: {
        async paymentRequest(config: AxiosRequestConfig) {
            this.transactionLink = (await sendRequest(config, SetToken.User)).data.transactionLink;
        },

        async getUserOrders(config: AxiosRequestConfig) {
            this.orderData = await sendRequest(config, SetToken.User);
        },

        async getAdminOrders(config: AxiosRequestConfig) {
            this.adminOrderData = await sendRequest(config, SetToken.Admin);
        },

        async getOneAdminOrders(config: AxiosRequestConfig) {
            this.oneOrderData = await sendRequest(config, SetToken.Admin);
        },

        async updateAdminOrders(config: AxiosRequestConfig) {
            console.log(config, 'YYYYYYYYYYYY');
            
            this.oneOrderData = await sendRequest(config, SetToken.Admin);
        },
    },

    getters: {
        getCurrentOrder(state) {
            if (state.orderData?.data) {
                return state.orderData?.data.filter(order => {
                    return order.status == 0 || order.status == 1 || order.status == 3
                });
            }
            return [];
        },

        getCanceledOrder(state) {
            if (state.orderData?.data) {
                return state.orderData?.data.filter(order => order.status == 2);
            }
            return [];
        },

        getReturnedOrder(state) {
            if (state.orderData?.data) {
                return state.orderData?.data.filter(order => order.status == 4);
            }
            return [];
        },

        getDeliveredOrder(state) {
            if (state.orderData?.data) {
                return state.orderData?.data.filter(order => order.status == 5);
            }
            return [];
        },

        getCurrentOrderCount() {
            return this.getCurrentOrder.length;
        },

        getCanceledOrderCount() {
            return this.getCanceledOrder.length;
        },

        getReturnedOrderCount() {
            return this.getReturnedOrder.length;
        },

        getDeliveredOrderCount() {
            return this.getDeliveredOrder.length;
        },

        statusList() {
            return [
                '',
                'پرداخت شده',
                'لغو شده',
                'ارسال شده',
                'مرجوع شده',
                'تحویل داده شده',
            ]
        },

        getStatus() {
            return (status: 0 | 1 | 2 | 3 | 4 | 5) => {
                return this.statusList[status];
            }
        },

        getTransactionStatus() {
            return (status: number) => {
                switch (status) {
                    case 1:
                        return 'پرداخت انجام نشده'
                    case 2:
                        return 'پرداخت ناموفق بوده است'
                    case 3:
                        return 'خطا رخ داده است'
                    case 4:
                        return 'بلوکه شده'
                    case 5:
                        return 'برگشت به پرداخت کننده'
                    case 6:
                        return 'برگشت خورده سیستمی'
                    case 7:
                        return 'انصراف از پرداخت'
                    case 8:
                        return 'به درگاه پرداخت منتقل شد'
                    case 10:
                        return 'در انتظار تایید پرداخت'
                    case 100:
                        return 'پرداخت تایید شده است'
                    case 101:
                        return 'پرداخت قبلا تایید شده است'
                    case 200:
                        return 'به دریافت کننده واریز شد'
                }
            }
        }
    }
});