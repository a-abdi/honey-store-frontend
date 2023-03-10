import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { CategoryData, CategoryListData } from "@/common/typings";

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categoryListData: {} as CategoryListData,
      category: {} as CategoryData | {},
    }
  },

  actions: {
    async createCategory(config: AxiosRequestConfig) {
      this.category = await sendRequest(config);
    },

    async getCategoryList(config: AxiosRequestConfig) {
      this.categoryListData = await sendRequest(config);
      console.log(this.categoryListData);
      
    }
  }
});