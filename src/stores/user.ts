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
    }
  },

  actions: {
    async login(config: AxiosRequestConfig) {
      this.userLoginData = await sendRequest(config, SetToken.User);
      localStorage.setItem('userAccessToken', this.userLoginData.access_token)
    },

    async signup(config: AxiosRequestConfig) {
      this.userData = await sendRequest(config);
    }
  }
});