import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { CategoryData, CategoryListData } from "@/common/typings";

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categoryListData: null as CategoryListData | null,
      categoryData: null as CategoryData | null,
    }
  },

  actions: {
    async createCategory(config: AxiosRequestConfig) {
      this.categoryData = await sendRequest(config);
    },

    async getCategoryList(config: AxiosRequestConfig) {
      this.categoryListData = await sendRequest(config);
    }
  }
});