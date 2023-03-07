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
                    <input v-model="loginInfo.phoneNumber" name="email" id="email" class="form-input">
                </div>
                <div class="form-label">
                    <label for="password" class="">password</label>
                </div>
                <div class="mb-2 px-2 text-gray-600">
                    <input v-model="loginInfo.password" name="password" id="password" type="password" class="form-input">
                </div>
                <div class="p-2 sm:flex">
                    <div class="">
                        <button :disabled="formStatus.loading" :class="{'cursor-wait': formStatus.loading}" type="submit" class="btn-blue">
                            Login
                        </button>
                    </div>
                </div>
                <div v-if="formStatus.error" class="w-full px-2 mb-4">
                    <ErrorMessage class="my-2" :error="formStatus.error" />
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
import type  { AxiosError } from 'axios';

const adminStore = useAdminStore();
const router = useRouter()
const formStatus = reactive({
    error: null as null | AxiosError,
    loading: false as boolean,
})

const loginInfo = reactive({
    phoneNumber: null as string | null,
    password: null as string | null,
})

const login = async() => {
    formStatus.loading = true
    formStatus.error = null
    try {
        const config = adminLoginConfig(loginInfo);
        await adminStore.login(config)
        router.push({ name: 'home' })
    } catch (error: any) {
        formStatus.error = error.response?.data
    }
    formStatus.loading = false
}
</script>