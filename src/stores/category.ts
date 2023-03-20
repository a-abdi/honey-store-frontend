import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { CategoryData, CategoryListData } from "@/common/typings/category.typings";
import { SetToken } from "@/common/typings/common.typings";

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categoryListData: null as CategoryListData | null,
      categoryData: null as CategoryData | null,
    }
  },

  actions: {
    async createCategory(config: AxiosRequestConfig) {
      this.categoryData = await sendRequest(config, SetToken.Admin);
    },

    async getCategory(config: AxiosRequestConfig) {
      this.categoryData = await sendRequest(config, SetToken.Admin);
    },

    async getCategoryList(config: AxiosRequestConfig) {
      this.categoryListData = await sendRequest(config, SetToken.Admin);
    },

    async editCategory(config: AxiosRequestConfig) {
      this.categoryData = await sendRequest(config, SetToken.Admin);
    },
  }
});