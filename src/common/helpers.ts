import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import type { AdminData } from "@/typings/adminData.typings";
export const sendRequest = async (config: AxiosRequestConfig): Promise<AdminData> => {
    return (await axios(config)).data;
}