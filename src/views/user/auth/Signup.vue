<template>
    <div class="form-base-v-1">
        <div class="form-design-v-1 bg-slate-100">
           <form @submit.prevent="">
                <div class="flex justify-evenly text-xs lg:text-sm px-4 pt-12 pb-6 mb-6">
                    <div class="flex items-center justify-center rounded-md bg-violet-600 py-3 w-36 cursor-pointer">
                        <div class="text-white">
                            ثبت نام
                        </div>
                        <div>
                            <AddUser class="fill-white w-4 h-4 mr-2"/>
                        </div>
                    </div>
                    <div class="flex items-center justify-center rounded-md bg-slate-100 py-3 w-36">
                        <div @click="goToLogin" class="text-violet-600 cursor-pointer">
                            ورود
                        </div>
                        <div @click="goToLogin">
                            <SimpleUser class="fill-violet-600 w-4 h-4 mr-2 cursor-pointer"/>
                        </div>
                    </div>
                </div>
                <div class="flex items-center py-1 bg-white my-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                    <div class="">
                        <Phone class="w-5 h-5 fill-violet-400 mx-1" />
                    </div>
                    <div class="w-full">
                        <input v-model="newUser.phoneNumber" name="phoneNumber" id="phoneNumber" class="form-input-v-1 placeholder-violet-500" placeholder="تلفن">
                    </div>
                </div>
                <div class="flex items-center py-1 bg-white my-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                    <div class="">
                        <Password class="w-5 h-5 fill-violet-500 mx-1" />
                    </div>
                    <div class="w-full">
                        <input v-model="newUser.password" name="password" id="password" type="password" class="form-input-v-1 placeholder-violet-500" placeholder="پسورد">
                    </div>
                </div>
                <div class="flex items-center py-1 bg-white my-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                    <div class="">
                        <Confirm class="w-5 h-5 fill-violet-500 mx-1" />
                    </div>
                    <div class="w-full">
                        <input v-model="newUser.passwordConfirm" name="password" id="password" type="password" class="form-input-v-1 placeholder-violet-500" placeholder="تایید پسورد">
                    </div>
                </div>
                <div @click="signup" class="my-6 px-6 ">
                    <div class="flex items-center justify-center rounded-md bg-violet-600 py-3 w-full cursor-pointer">
                        <div class="text-white">
                            ثبت نام
                        </div>
                        <div>
                            <AddUser class="fill-white w-4 h-4 mr-2"/>
                        </div>
                    </div>
                </div>
            </form>
            <Message class="absolute bottom-8 right-8 bg-gray-300" 
                :message="page.message"
                :showMessage="page.showMessage"
                :typeMessage="page.typeMessage"
                @fadeMessage="page.showMessage = false" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { userSignupConfig } from '@/common/config/axiox.config';
import type { NewUser } from '@/common/typings/user.typing';
import AddUser from '@/components/icons/AddUser.vue';
import Confirm from '@/components/icons/Confirm.vue';
import Password from '@/components/icons/Password.vue';
import Phone from '@/components/icons/Phone.vue';
import SimpleUser from '@/components/icons/SimpleUser.vue';
import router from '@/router';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { storeToRefs } from 'pinia';
import Message from '@/components/message/Message.vue';

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
const page = reactive<Page>({});
const goToLogin = () => {
    router.push('/login');
};

const newUser = reactive<NewUser>({
    phoneNumber: '',
    password: '',
    passwordConfirm: ''
});

const signup = async () => {
    try {
        const config = userSignupConfig(newUser);
        await userStore.signup(config);
        newUser.phoneNumber = '';
        newUser.password = '';
        newUser.passwordConfirm = '';
        page.showMessage = true;
        page.typeMessage = TypeMessage.Success;
        page.message = userData.value?.message;
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