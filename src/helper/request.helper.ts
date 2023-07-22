import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { SetToken } from '@/common/typings/common.typings';

export class RequestHelper {
    static instance: RequestHelper;
    private readonly adminAccessToken = localStorage.getItem('adminAccessToken');
    private readonly userAccessToken = localStorage.getItem('userAccessToken');

    async send(config: AxiosRequestConfig, setToken: SetToken = SetToken.Default) {
        switch (setToken) {
            case 'admin': {
                if (this.adminAccessToken) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.adminAccessToken}`;
                }
                break;
            }
            case 'user': {
                if (this.userAccessToken) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.userAccessToken}`;
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