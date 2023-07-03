export interface CommonResponseData {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};

export interface metaData {
    previousPage?: string;
    nextPage: string;
}

export interface CommonResponseDataOptional {
    message?: string;
    metaData?: metaData; 
};

export interface Page {
    loading?: boolean;
    sending?: boolean;
    errorMessage?: null | string;
    successMessage?: null | string;
    message?: string;
    typeMessage?: TypeMessage;
    showMessage?: boolean;
};

export interface City {
    id: number,
    name: string,
    slug: string,
    province_id: number
};

export enum TypeMessage {
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
};

export enum SetToken {
    Default = 'noToken',
    Admin = 'admin',
    User = 'user'
};

export interface Image {
    url?: string;
    file?: File;
    id?: string;
}

export interface StringObject {
    [name: string]: string;
}

export interface StringBoolean {
    [name: string]: boolean;
}

export interface Sort {
    index: number;
    text: string;
}