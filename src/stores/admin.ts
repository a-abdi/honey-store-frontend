import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { Admin, AdminData } from "@/common/typings/admin.typings";
import { SetToken } from "@/common/typings/common.typings";

export const useAdminStore = defineStore("admin", {
  state: () => {
    return {
      admin: null as Admin | null,
      adminData: {} as AdminData,
    }
  },

  actions: {
    async login(config: AxiosRequestConfig) {
      this.adminData = await sendRequest(config, SetToken.Admin);
      localStorage.setItem('adminAccessToken', this.adminData.access_token)
    }
  }
});