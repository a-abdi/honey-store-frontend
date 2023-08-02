import { defineStore } from "pinia";
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from "@/common/typings/common.typings";
import type { UserData, UserDataList, UserLoginData } from "@/common/typings/user.typing";
import { RequestHelper } from "@/helper/request.helper";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userData: null as UserData | null,
      userDataList: null as UserDataList | null,
      userLoginData: {} as UserLoginData,
      passwordUpdateData: null as {message: string} | null,
    }
  },

  actions: {
    async login(config: AxiosRequestConfig) {
      this.userLoginData = await RequestHelper.getInstance().send(config);
      localStorage.removeItem('userAccessToken');      
      localStorage.setItem('userAccessToken', this.userLoginData.data.access_token);
    },

    async signup(config: AxiosRequestConfig) {
      this.userData = await RequestHelper.getInstance().send(config);
    },

    async update(config: AxiosRequestConfig) {
      this.userData = await RequestHelper.getInstance().send(config, SetToken.User);
    },

    async updatePassword(config: AxiosRequestConfig) {
      this.passwordUpdateData = await RequestHelper.getInstance().send(config, SetToken.User);
    },

    async getOneUser(config: AxiosRequestConfig) {
      this.userData = await RequestHelper.getInstance().send(config, SetToken.User);
    },

    async getUserList(config: AxiosRequestConfig) {
      this.userDataList = null;
      this.userDataList = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },

    async signout() {
      this.userLoginData.data.access_token = '';
      this.userData = null;
      localStorage.removeItem('userAccessToken');
    }
  },

  getters: {
    userLogged() {
      if( this.userLoginData?.data?.access_token ) {
        return true;
      } else {
        return false;
      }
    }
  }
});