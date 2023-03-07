import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { CategoryData } from "@/typings/categoryData.typings";
import type { Category } from "@/typings/category.typing";

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categoryData: null as CategoryData | null,
      categoryList: [] as Category[],
      category: null as Category | null,
    }
  },

  actions: {
    async createCategory(config: AxiosRequestConfig) {
      this.category = await sendRequest(config);
    },

    async getCategoryList(config: AxiosRequestConfig) {
      this.category = await sendRequest(config);
    }
  }
});