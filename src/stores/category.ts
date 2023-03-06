import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { Category } from "@/typings/category.typings";
import type { NewCategory } from "@/typings/newCategory.typing";

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      category: null as Category | null,
      newCategory: null as NewCategory | null,
    }
  },

  actions: {
    async createCategory(config: AxiosRequestConfig) {
      this.newCategory = await sendRequest(config);
    }
  }
});