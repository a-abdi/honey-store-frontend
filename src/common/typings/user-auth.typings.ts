import type { CommonResponseDataOptional } from "./common.typings";

export interface VerifyCode {
    phoneNumber: string;
    smsTtl: number;
    hasPass: boolean;
}

export interface VerifyCodeData extends CommonResponseDataOptional {
    data: VerifyCode;
}