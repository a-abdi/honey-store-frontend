import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from "@/common/typings/common.typings";

export const useOrderStore = defineStore("order", {
    state: () => {
        return {
            transactionLink: null as string | null,
        }
    },

    actions: {
        async paymentRequest(config: AxiosRequestConfig) {
            this.transactionLink = (await sendRequest(config, SetToken.User)).data.transactionLink;
        },
    }
});