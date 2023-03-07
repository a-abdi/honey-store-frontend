import type { AxiosError } from "axios";

export interface Form {
    loading?: boolean;
    error?:  null | AxiosError;
    success?: null | object;
}