import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { ProductListData } from "@/common/typings";

export const useProductStore = defineStore("product", {
  state: () => {
    return {
      productListData: null as ProductListData | null,
    }
  },

  actions: {
    async getProductList(config: AxiosRequestConfig) {
      this.productListData = await sendRequest(config);
    },
  }
});