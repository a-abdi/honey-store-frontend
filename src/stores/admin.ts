import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { Admin } from "@/typings/admin.typings";
import type { AdminData } from "@/typings/adminData.typings";
import type { AxiosRequestConfig } from 'axios';

export const useAdminStore = defineStore("admin", {
  state: () => {
    return {
      admin: null as Admin | null,
      adminData: {} as AdminData,
    }
  },

  actions: {
    async login(config: AxiosRequestConfig) {
      this.adminData = await sendRequest(config);
    }
  }
});