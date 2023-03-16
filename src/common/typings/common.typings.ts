
export interface CommonResponseData {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export interface CommonResponseDataOptional {
    message?: string;
    metaData?: object; 
};



export interface Page {
    loading?: boolean;
    errorMessage?: null | string;
    successMessage?: null | string;
    message?: string;
    typeMessage?: TypeMessage;
    showMessage?: boolean;
};



export enum TypeMessage {
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
};

