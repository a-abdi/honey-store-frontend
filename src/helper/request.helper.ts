import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from '@/common/typings/common.typings';

export class RequestHelper {
    static instance: RequestHelper;

    async send(config: AxiosRequestConfig, setToken: SetToken = SetToken.Default) {
        const adminAccessToken = localStorage.getItem('adminAccessToken');
        const userAccessToken = localStorage.getItem('userAccessToken');
        
        switch (setToken) {
            case 'admin': {
                if (adminAccessToken) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${adminAccessToken}`;
                }
                break;
            }
            case 'user': {
                if (userAccessToken) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userAccessToken}`;
                }
                break;
            }
            default:
                break;
        }
        return (await axios(config)).data;
    }

    public static getInstance(): RequestHelper {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}