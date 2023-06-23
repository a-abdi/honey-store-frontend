import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from "@/common/typings/common.typings";
import type { CommentData, CommentListData, CommentNotVerifyListData } from "@/common/typings/comment.typings";

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
      this.commentData = await sendRequest(config, SetToken.User);
    },

    async getComment(config: AxiosRequestConfig) {
      this.commentData = await sendRequest(config, SetToken.User);
    },

    async getCommentList(config: AxiosRequestConfig) {
      this.commentListData = await sendRequest(config);
    },

    async editComment(config: AxiosRequestConfig) {
      this.commentData = await sendRequest(config, SetToken.User);
    },

    async deleteComment(config: AxiosRequestConfig) {
      await sendRequest(config, SetToken.User);
      this.commentData = null;
    },

    async getNotVerifyComment(config: AxiosRequestConfig) {
      this.commentListDataNotVerify = null;
      this.commentListDataNotVerify = await sendRequest(config, SetToken.Admin);
    },

    async updateCommentByAdmin(config: AxiosRequestConfig) {
      await sendRequest(config, SetToken.Admin);
    },

    async delteCommentByAdmin(config: AxiosRequestConfig) {
      await sendRequest(config, SetToken.Admin);
    }
  },

  getters: {
    
  }
});