import { defineStore } from "pinia";
import type { AxiosRequestConfig } from 'axios';
import type { ProductListData } from "@/common/typings/product.typings";
import { RequestHelper } from "@/helper/request.helper";

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
      this.searchData = await RequestHelper.getInstance().send(config);
    },
    async lazySearch(config: AxiosRequestConfig) {
      this.searchData = await RequestHelper.getInstance().send(config);
      if (this.searchDataLazy?.data.length && this.searchData?.data) {
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