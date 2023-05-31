<template>
    <TemplateChangeUserInfo>
        <div class="w-full mb-3 px-2 text-indigo-900 text-sm">
            <label for="name">
                نام
            </label>
        </div>
        <div
            class="flex mb-10 items-center py-1 bg-white text-gray-600 border border-gray-200 rounded-md shadow shadow-violet-200/50">
            <div class="">
                <EditAccount class="w-5 h-5 fill-violet-500 mx-1"/>
            </div>
            <div class="w-full">
                <input v-model="fullNameEdit.firstName" name="name" id="name" type="text" class="form-input-v-1">
            </div>
        </div>
        <div class="w-full mb-3 px-2 text-indigo-900 text-sm">
            <label for="lastname">
                نام خانوادگی
            </label>
        </div>
        <div
            class="flex mb-10 items-center py-1 bg-white text-gray-600 border border-gray-200 rounded-md shadow shadow-violet-200/50">
            <div class="">
                <EditAccount class="w-5 h-5 fill-violet-500 mx-1"/>
            </div>
            <div class="w-full">
                <input v-model="fullNameEdit.lastName" name="lastname" id="lastname" type="text"
                    class="form-input-v-1">
            </div>
        </div>
        <div class="flex flex-row-reverse py-1">
            <button @click="changeFullname" class="btn-violet">
                تغییر نام
            </button>
        </div>
        <Message class="absolute bottom-8 right-10 bg-gray-300" :message="page.message" :showMessage="page.showMessage"
            :typeMessage="page.typeMessage" @fadeMessage="page.showMessage = false" />
    </TemplateChangeUserInfo>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { updateUserConfig } from '@/common/config/axiox.config';
import type { FullName } from '@/common/typings/user.typing';
import { useUserStore } from '@/stores/user';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import Message from '../message/Message.vue';
import TemplateChangeUserInfo from './TemplateChangeUserInfo.vue';
import EditAccount from '../icons/EditAccount.vue';
const page = reactive<Page>({});
const fullNameEdit = reactive<Partial<FullName>>({});
const userStore = useUserStore();
const changeFullname = async () => {
    try {
        const config = updateUserConfig(fullNameEdit);
        await userStore.update(config);
        page.showMessage = true;
        page.typeMessage = TypeMessage.Success;
        page.message = userStore.userData?.message;
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