import { defineStore } from "pinia";
import type { AxiosRequestConfig } from 'axios';
import type { CategoryData, CategoryListData } from "@/common/typings/category.typings";
import { SetToken } from "@/common/typings/common.typings";
import { RequestHelper } from "@/helper/request.helper";

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categoryListData: null as CategoryListData | null,
      categoryData: null as CategoryData | null,
    }
  },

  actions: {
    async createCategory(config: AxiosRequestConfig) {
      this.categoryData = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },

    async getCategory(config: AxiosRequestConfig) {
      this.categoryData = null;
      this.categoryData = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },

    async getCategoryList(config: AxiosRequestConfig) {
      this.categoryListData = null;
      this.categoryListData = await RequestHelper.getInstance().send(config);
    },

    async editCategory(config: AxiosRequestConfig) {
      this.categoryData = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },
  }
});