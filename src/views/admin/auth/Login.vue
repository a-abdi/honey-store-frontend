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
                    <label for="password" class="">پسورود</label>
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
                <div v-if="page.errorMessage" class="w-full px-2 mb-4">
                    <ErrorMessage class="my-2" :error="page.errorMessage" />
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import ErrorMessage from '@/components/message/ErrorMessage.vue';
import { useAdminStore } from '@/stores/admin';
import { adminLoginConfig } from '@/common/config/axiox.config';
import type { Page } from '@/common/typings/common.typings';
import type { AdminLoginData } from '@/common/typings/admin.typings';

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
        page.errorMessage = error.response?.data;
    }
    page.loading = false;
}
</script>