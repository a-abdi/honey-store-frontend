import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const paymentConfig = (): AxiosRequestConfig => ({
    method: 'get',
    url: `${BASE_URL}checkout/payment`,
});

