import { defineStore } from "pinia";
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from "@/common/typings/common.typings";
import type { PropertyData, PropertyListData } from "@/common/typings/property.typing";
import { RequestHelper } from "@/helper/request.helper";

export const usePropertyStore = defineStore("property", {
  state: () => {
    return {
      propertyListData: null as PropertyListData | null,
      propertyData: null as PropertyData | null,
    }
  },

  actions: {
    async createProperty(config: AxiosRequestConfig) {
      this.propertyData = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },

    async getProperty(config: AxiosRequestConfig) {
      this.propertyData = null;
      this.propertyData = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },

    async getPropertyList(config: AxiosRequestConfig) {
      this.propertyListData = null;
      this.propertyListData = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },

    async editProperty(config: AxiosRequestConfig) {
      this.propertyData = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },

    async deleteProperty(config: AxiosRequestConfig) {
      this.propertyData = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },
  }
});