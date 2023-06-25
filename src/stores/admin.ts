import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { AdminData } from "@/common/typings/admin.typings";
import { SetToken } from "@/common/typings/common.typings";

export const useAdminStore = defineStore("admin", {
  state: () => {
    return {
      adminData: {} as AdminData,
    }
  },

  actions: {
    async login(config: AxiosRequestConfig) {
      this.adminData = await sendRequest(config, SetToken.Admin);
      localStorage.removeItem('adminAccessToken');  
      localStorage.setItem('adminAccessToken', this.adminData?.data?.access_token)
    },

    async signout() {
      this.adminData.data.access_token = '';
      localStorage.removeItem('adminAccessToken');
    }
  },

  getters: {
    adminLogged() {
      if( this.adminData?.data?.access_token && this.adminData?.data?.access_token.length > 1) {
        return true;
      } else {
        return false;
      }
    }
  }
});