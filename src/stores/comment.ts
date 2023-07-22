import { defineStore } from "pinia";
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from "@/common/typings/common.typings";
import type { CommentData, CommentListData, CommentNotVerifyListData } from "@/common/typings/comment.typings";
import { RequestHelper } from "@/helper/request.helper";

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      commentListData: null as CommentListData | null,
      commentData: null as CommentData | null,
      commentListDataNotVerify: null as CommentNotVerifyListData | null,
    }
  },

  actions: {
    async createComment(config: AxiosRequestConfig) {
      this.commentData = await RequestHelper.getInstance().send(config, SetToken.User);
    },

    async getComment(config: AxiosRequestConfig) {
      this.commentData = await RequestHelper.getInstance().send(config, SetToken.User);
    },

    async getCommentList(config: AxiosRequestConfig) {
      this.commentListData = await RequestHelper.getInstance().send(config);
    },

    async editComment(config: AxiosRequestConfig) {
      this.commentData = await RequestHelper.getInstance().send(config, SetToken.User);
    },

    async deleteComment(config: AxiosRequestConfig) {
      await RequestHelper.getInstance().send(config, SetToken.User);
      this.commentData = null;
    },

    async getNotVerifyComment(config: AxiosRequestConfig) {
      this.commentListDataNotVerify = null;
      this.commentListDataNotVerify = await RequestHelper.getInstance().send(config, SetToken.Admin);
    },

    async updateCommentByAdmin(config: AxiosRequestConfig) {
      await RequestHelper.getInstance().send(config, SetToken.Admin);
    },

    async delteCommentByAdmin(config: AxiosRequestConfig) {
      await RequestHelper.getInstance().send(config, SetToken.Admin);
    }
  },

  getters: {
    
  }
});