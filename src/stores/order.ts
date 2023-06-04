import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from "@/common/typings/common.typings";
import type { OrderData } from "@/common/typings/order.typings";

export const useOrderStore = defineStore("order", {
    state: () => {
        return {
            transactionLink: null as string | null,
            orderData: null as OrderData | null,
        }
    },

    actions: {
        async paymentRequest(config: AxiosRequestConfig) {
            this.transactionLink = (await sendRequest(config, SetToken.User)).data.transactionLink;
        },

        async getUserOrders(config: AxiosRequestConfig) {
            this.orderData = await sendRequest(config, SetToken.User);
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
        }
    }
});