import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useAdminStore } from '@/stores/admin';

export const sendRequest = async (config: AxiosRequestConfig) => {
    const adminStore = useAdminStore();
    if (adminStore.adminData?.access_token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${adminStore.adminData.access_token}`;
    }
    return (await axios(config)).data;
}