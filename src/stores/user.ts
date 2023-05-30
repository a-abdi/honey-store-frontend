import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from "@/common/typings/common.typings";
import type { UserData, UserLoginData } from "@/common/typings/user.typing";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userData: null as UserData | null,
      userLoginData: {} as UserLoginData,
      passwordUpdateData: null as {message: string} | null,
    }
  },

  actions: {
    async login(config: AxiosRequestConfig) {
      this.userLoginData = await sendRequest(config);
      localStorage.removeItem('userAccessToken');      
      localStorage.setItem('userAccessToken', this.userLoginData.data.access_token);
    },

    async signup(config: AxiosRequestConfig) {
      this.userData = await sendRequest(config);
    },

    async update(config: AxiosRequestConfig) {
      this.userData = await sendRequest(config, SetToken.User);
    },

    async updatePassword(config: AxiosRequestConfig) {
      this.passwordUpdateData = await sendRequest(config, SetToken.User);
    },

    async getOneUser(config: AxiosRequestConfig) {
      this.userData = await sendRequest(config, SetToken.User);
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