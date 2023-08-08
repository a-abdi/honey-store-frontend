import type { CommonResponseData, CommonResponseDataOptional } from "./common.typings";

export interface NewUser {
    phoneNumber: string;
    password?: string;
    passwordConfirm?: string;
};

export interface PasswordEdit {
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
};

export interface FullName {
    firstName: string;
    lastName: string;
};

export interface UserAddress {
    province: string;
    city: string;
    plaque: string;
    postalAddress: string;
    recipient: UserRecipient;
    postalCode: string;
    selected: boolean;
};

export interface UserRecipient {
    firstName: string;
    lastName: string;
    phoneNumber: string;
};

export interface User extends FullName, Omit<NewUser, 'password' | 'passwordConfirm'>, CommonResponseData {
    address: UserAddress | null
};

export interface UserData extends CommonResponseDataOptional {
    data: User | null;
};

export interface UserDataList extends CommonResponseDataOptional {
    data: User[] | [];
};

export interface UserLogin {
    phoneNumber: string | null;
    password: string | null;
};

export interface UserLoginData {
    data: {
        access_token: string
    };
};


