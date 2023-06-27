import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => {
    return {
      pageLoading: false
    }
  },

  actions: {
    pageLoadingToTrue() {
      this.pageLoading = true;
    },
    PageLoadingToFalse() {
      this.pageLoading = false;
    }
  }
});