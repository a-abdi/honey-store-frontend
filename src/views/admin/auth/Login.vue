<template>
    <div class="form-base">
        <div class="form-design">
           <form @submit.prevent="login">
                <div class="form-title">
                    ورود ادمین
                </div>
                <div class="form-label">
                    <label for="phoneNumber" class="">تلفن</label>
                </div>
                <div class="mb-2 px-2 text-gray-600">
                    <input v-model="loginData.phoneNumber" name="phoneNumber" id="phoneNumber" class="form-input">
                </div>
                <div class="form-label">
                    <label for="password" class="">پسورد</label>
                </div>
                <div class="mb-2 px-2 text-gray-600">
                    <input v-model="loginData.password" name="password" id="password" type="password" class="form-input">
                </div>
                <div class="p-2 flex flex-row-reverse">
                    <div class="">
                        <button :disabled="page.loading" :class="{'cursor-wait': page.loading}" type="submit" class="btn-blue">
                            ورود
                        </button>
                    </div>
                </div>
                <Message class="absolute bottom-8 right-8 bg-gray-300" 
                    :message="page.message"
                    :showMessage="page.showMessage"
                    :typeMessage="page.typeMessage"
                    @fadeMessage="page.showMessage = false" 
                />
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/admin';
import { adminLoginConfig } from '@/common/config/axiox.config';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import type { AdminLoginData } from '@/common/typings/admin.typings';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';

const adminStore = useAdminStore();
const router = useRouter();
const page = reactive<Page>({
    errorMessage: null,
    loading: false,
});
const loginData = reactive<AdminLoginData>({
    phoneNumber: null,
    password: null,
});
const login = async() => {
    page.loading = true;
    page.errorMessage = null;
    try {
        const config = adminLoginConfig(loginData);
        await adminStore.login(config);
        router.push({ name: 'admin/dashboard/products/Home' })
    } catch (error: any) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            page.message = getAxiosErrorMessage(error);
        } else {
            console.log(error);
        }
    }
    page.loading = false;
}
</script>