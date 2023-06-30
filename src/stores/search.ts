import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { ProductListData } from "@/common/typings/product.typings";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      searchData: null as ProductListData | null,
    }
  },

  actions: {
    async search(config: AxiosRequestConfig) {
      this.searchData = null;
      this.searchData = await sendRequest(config);
    },
  }
});