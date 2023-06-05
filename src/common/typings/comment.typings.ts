import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";

export interface NewComment {
    title?: string;
    text: string;
    score?: number;
}

export interface Comment extends NewComment, CommonResponseData {
    user: {
        fullName: string;
        id: string;
        buyer: boolean;
    },
    verify: boolean;
    product: string;
}

export interface CommentData extends CommonResponseDataOptional {
    data: Comment | null;
}

export interface CommentListData extends CommonResponseDataOptional {
    data: Comment[] | [];
}