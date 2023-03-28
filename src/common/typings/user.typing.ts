import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";

export interface NewUser {
    phoneNumber: string;
    password: string;
    passwordConfirm: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    postalCode?: string;
    city?: string;
};

export interface User extends Omit<NewUser, 'password' | 'passwordConfirm'>, CommonResponseData {};

export interface UserData extends CommonResponseDataOptional {
    data: User | null;
};

export interface UserLoginData {
    access_token: string;
};


