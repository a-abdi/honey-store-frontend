<template>
    <div class="form-base">
        <div class="form-design">
           <form @submit.prevent="login">
                <div class="form-title">
                    <slot></slot>
                </div>
                <div class="form-label">
                    <label for="email" class="">email</label>
                </div>
                <div class="mb-2 px-2 text-gray-600">
                    <input v-model="loginData.phoneNumber" name="email" id="email" class="form-input">
                </div>
                <div class="form-label">
                    <label for="password" class="">password</label>
                </div>
                <div class="mb-2 px-2 text-gray-600">
                    <input v-model="loginData.password" name="password" id="password" type="password" class="form-input">
                </div>
                <div class="p-2 sm:flex">
                    <div class="">
                        <button :disabled="form.loading" :class="{'cursor-wait': form.loading}" type="submit" class="btn-blue">
                            Login
                        </button>
                    </div>
                </div>
                <div v-if="form.error" class="w-full px-2 mb-4">
                    <ErrorMessage class="my-2" :error="form.error" />
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
import type { AdminLoginData, Form } from '@/common/typings';

const adminStore = useAdminStore();
const router = useRouter();
const form = reactive<Form>({
    error: null,
    loading: false,
});

const loginData = reactive<AdminLoginData>({
    phoneNumber: null,
    password: null,
});

const login = async() => {
    form.loading = true;
    form.error = null;
    try {
        const config = adminLoginConfig(loginData);
        await adminStore.login(config);
        router.push({ name: 'Admin/Dashboard' })
    } catch (error: any) {
        form.error = error.response?.data;
    }
    form.loading = false;
}
</script>