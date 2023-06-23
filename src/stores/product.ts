import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { ProductData, ProductListData } from "@/common/typings/product.typings";
import { SetToken } from "@/common/typings/common.typings";

export const useProductStore = defineStore("product", {
  state: () => {
    return {
      productListData: null as ProductListData | null,
      productData: null as ProductData | null,
    }
  },

  actions: {
    async createProduct(config: AxiosRequestConfig<FormData>) {
      this.productData = null;
      this.productData = await sendRequest(config, SetToken.Admin);
    },

    async getProductList(config: AxiosRequestConfig) {
      this.productListData = null;
      this.productListData = await sendRequest(config);
    },

    async getProduct(config: AxiosRequestConfig) {
      this.productData = null;
      this.productData = await sendRequest(config);
    },

    async deleteProduct(config: AxiosRequestConfig) {
      this.productData = null;
      this.productData = await sendRequest(config, SetToken.Admin);
    },

    async editProduct(config: AxiosRequestConfig) {
      this.productData = null;
      this.productData = await sendRequest(config, SetToken.Admin);
    },
  }
});