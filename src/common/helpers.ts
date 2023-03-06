import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
export const sendRequest = async (config: AxiosRequestConfig) => {
    return (await axios(config)).data;
}