<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-show="showDialog" class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="max-h-128">
                    <div class="relative mx-auto bg-white rounded-lg shadow-xl sm:w-5/12 w-full" role="dialog" ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                        <OnClickOutside @trigger="emit('cancel')" class="sm:my-4 p-4">
                           <button @click="emit('cancel')" class="absolute top-4 left-4 text-indigo-600 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"/></svg>
                            </button>
                           <div class="mt-10 pt-6 mb-6 border-t border-gray-300">
                                <div class="w-full mb-3 px-2 text-indigo-900 text-sm">
                                    <label for="password">
                                        رمز عبور فعلی
                                    </label>
                                </div>
                                <div class="flex mb-10 items-center py-1 bg-white text-gray-600 border border-gray-200 rounded-md shadow shadow-violet-200/50">
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
                                <div class="flex mb-10 items-center py-1 bg-white text-gray-600 border border-gray-200 rounded-md shadow shadow-violet-200/50">
                                    <div class="">
                                        <password class="w-5 h-5 fill-violet-500 mx-1" />
                                    </div>
                                    <div class="w-full">
                                        <input v-model="passwordEdit.newPassword" name="passwordConfirm" id="passwordConfirm" type="password" class="form-input-v-1">
                                    </div>
                                </div>
                                <div class="w-full mb-3 px-2 text-indigo-900 text-sm">
                                    <label for="newPasswordConfirm">
                                        تکرار رمز عبور جدید
                                    </label>
                                </div>
                                <div class="flex mb-10 items-center py-1 bg-white text-gray-600 border border-gray-200 rounded-md shadow shadow-violet-200/50">
                                    <div class="">
                                        <password class="w-5 h-5 fill-violet-500 mx-1" />
                                    </div>
                                    <div class="w-full">
                                        <input v-model="passwordEdit.newPasswordConfirm" name="newPasswordConfirm" id="newPasswordConfirm" type="password" class="form-input-v-1">
                                    </div>
                                </div>
                                <div class="flex flex-row-reverse py-1">
                                    <button @click="changePassword" class="btn-violet"> 
                                        تغییر رمز عبور
                                    </button>
                                </div>
                           </div>
                        </OnClickOutside>
                    </div>
                </div>
                <Message class="absolute bottom-8 right-8 bg-gray-300" 
                    :message="page.message"
                    :showMessage="page.showMessage"
                    :typeMessage="page.typeMessage"
                    @fadeMessage="page.showMessage = false" 
                />
            </div>
        </transition>
    </teleport>   
</template>
<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
import Password from '../icons/Password.vue';
import { reactive } from 'vue';
import { updateUserPasswordConfig } from '@/common/config/axiox.config';
import type { PasswordEdit } from '@/common/typings/user.typing';
import { useUserStore } from '@/stores/user';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import Message from '../message/Message.vue';
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