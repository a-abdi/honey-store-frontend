import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { ProductListData } from "@/common/typings/product.typings";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      searchData: null as ProductListData | null,
      searchDataLazy: null as ProductListData | null,
    }
  },

  actions: {
    async search(config: AxiosRequestConfig) {
      this.searchData = null;
      this.searchData = await sendRequest(config);
    },
    async lazySearch(config: AxiosRequestConfig) {
      this.searchData = await sendRequest(config);
      if (this.searchDataLazy?.data.length && this.searchData?.data) {
        const { data } = this.searchData;
        this.searchDataLazy.data = [ ...this.searchDataLazy.data, ...this.searchData.data ];
      } else {
        this.searchDataLazy = this.searchData;
      }
    },

    reset() {
      this.searchData = null;
      this.searchDataLazy = null;
    }
  }
});