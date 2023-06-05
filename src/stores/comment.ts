import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from "@/common/typings/common.typings";
import type { CommentData, CommentListData } from "@/common/typings/comment.typings";

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      commentListData: null as CommentListData | null,
      commentData: null as CommentData | null,
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
      console.log(this.commentListData);
      
    },

    async editComment(config: AxiosRequestConfig) {
      this.commentData = await sendRequest(config, SetToken.User);
    },

    async deleteComment(config: AxiosRequestConfig) {
      this.commentData = await sendRequest(config, SetToken.User);
    },
  },

  getters: {
    productScore(state) {
      let totalScore = 0;
      let totalScoreCount = 0;
      if (state.commentListData?.data) {
        for (let index = 0; index < state.commentListData?.data.length; index++) {
          const score = state.commentListData?.data[index].score;
          if (score) {
            totalScore += score;
            totalScoreCount += 1;
          }
        }
      }
      const productScore = totalScoreCount ? totalScore / totalScoreCount : 0;
      return productScore;
    },
  }
});