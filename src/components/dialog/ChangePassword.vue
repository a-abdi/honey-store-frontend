<template>
    <TemplateChangeUserInfo>
        <div class="w-full mb-3 px-2 text-indigo-900 text-sm">
            <label for="password">
                رمز عبور فعلی
            </label>
        </div>
        <div
            class="flex mb-10 items-center py-1 bg-white text-gray-600 border border-gray-200 rounded-md shadow shadow-violet-200/50">
            <div class="">
                <password class="w-5 h-5 fill-violet-500 mx-1" />
            </div>
            <div class="w-full">
                <input v-model="passwordEdit.password" name="password" id="password" type="password" class="form-input-v-1">
            </div>
        </div>
        <div class="w-full mb-3 px-2 text-indigo-900 text-sm">
            <label for="passwordConfirm">
                رمز عبور جدید
            </label>
        </div>
        <div
            class="flex mb-10 items-center py-1 bg-white text-gray-600 border border-gray-200 rounded-md shadow shadow-violet-200/50">
            <div class="">
                <password class="w-5 h-5 fill-violet-500 mx-1" />
            </div>
            <div class="w-full">
                <input v-model="passwordEdit.newPassword" name="passwordConfirm" id="passwordConfirm" type="password"
                    class="form-input-v-1">
            </div>
        </div>
        <div class="w-full mb-3 px-2 text-indigo-900 text-sm">
            <label for="newPasswordConfirm">
                تکرار رمز عبور جدید
            </label>
        </div>
        <div
            class="flex mb-10 items-center py-1 bg-white text-gray-600 border border-gray-200 rounded-md shadow shadow-violet-200/50">
            <div class="">
                <password class="w-5 h-5 fill-violet-500 mx-1" />
            </div>
            <div class="w-full">
                <input v-model="passwordEdit.newPasswordConfirm" name="newPasswordConfirm" id="newPasswordConfirm"
                    type="password" class="form-input-v-1">
            </div>
        </div>
        <div class="flex flex-row-reverse py-1">
            <button @click="changePassword" class="btn-violet">
                تغییر رمز عبور
            </button>
        </div>

        <Message class="absolute bottom-8 right-10 bg-gray-300" :message="page.message" :showMessage="page.showMessage"
            :typeMessage="page.typeMessage" @fadeMessage="page.showMessage = false" />
    </TemplateChangeUserInfo>
</template>
<script setup lang="ts">
import Password from '../icons/Password.vue';
import { reactive } from 'vue';
import { updateUserPasswordConfig } from '@/common/config/axiox.config';
import type { PasswordEdit } from '@/common/typings/user.typing';
import { useUserStore } from '@/stores/user';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import Message from '../message/Message.vue';
import TemplateChangeUserInfo from './TemplateChangeUserInfo.vue';
const page = reactive<Page>({});
const passwordEdit = reactive<PasswordEdit>({
    password: '',
    newPassword: '',
    newPasswordConfirm: ''
});
defineProps({
    showDialog: {
        type: Boolean,
        default: false,
    }
});
const emit = defineEmits(['cancel']);
const userStore = useUserStore();
const changePassword = async () => {
    try {
        const config = updateUserPasswordConfig(passwordEdit);
        await userStore.updatePassword(config);
        page.showMessage = true;
        page.typeMessage = TypeMessage.Success;
        page.message = userStore.passwordUpdateData?.message;
    } catch (error) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            page.message = getAxiosErrorMessage(error);
        } else {
            console.log(error);
        }
    }
}
</script>