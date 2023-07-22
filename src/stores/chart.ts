import { defineStore } from "pinia";
import type { AxiosRequestConfig } from 'axios';
import type { ReportOrderDateData, ReportOrderStatusData } from "@/common/typings/chart.typings";
import { SetToken } from "@/common/typings/common.typings";
import { RequestHelper } from "@/helper/request.helper";

export const useChartStore = defineStore("chart", {
  state: () => {
    return {
      orderWatingPayDates: null as ReportOrderDateData | null,
      orderCanceledDates: null as ReportOrderDateData | null,
      orderDeliveredDates: null as ReportOrderDateData | null,
      orderPaymentDates: null as ReportOrderDateData | null,
      orderSendDate: null as ReportOrderDateData | null,
      orderReturnDate: null as ReportOrderDateData | null,
      orderStatus: null as ReportOrderStatusData | null,
    }
  },

  actions: {
    async getOrderDeliveredDate(config: AxiosRequestConfig) {
      this.orderDeliveredDates = null;
      this.orderDeliveredDates = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },
    async getOrderWatingDate(config: AxiosRequestConfig) {
        this.orderWatingPayDates = null;
        this.orderWatingPayDates = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },
    async getOrderCanceledDate(config: AxiosRequestConfig) {
        this.orderCanceledDates = null;
        this.orderCanceledDates = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },
    async getOrderPaymentDate(config: AxiosRequestConfig) {
        this.orderPaymentDates = null;
        this.orderPaymentDates = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },
    async getOrderSendDate(config: AxiosRequestConfig) {
        this.orderSendDate = null;
        this.orderSendDate = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },
    async getOrderReturnedDate(config: AxiosRequestConfig) {
        this.orderReturnDate = null;
        this.orderReturnDate = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },
    async getOrderStatus(config: AxiosRequestConfig) {
      this.orderStatus = null;
      this.orderStatus = await RequestHelper.getInstance().send(config, SetToken.Admin);
  },
  }
});