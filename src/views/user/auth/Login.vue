<template>
    <div class="form-base">
        <div class="form-design bg-slate-100">
           <form @submit.prevent="">
                <div class="flex justify-evenly text-xs lg:text-sm px-4 pt-12 pb-6 mb-6">
                    <div class="flex items-center justify-center rounded-md bg-slate-100 py-3 w-36">
                        <div  @click="goToSignup" class="text-violet-600 cursor-pointer">
                            ثبت نام
                        </div>
                        <div  @click="goToSignup">
                            <AddUser class="fill-violet-600 w-4 h-4 mr-2 cursor-pointer"/>
                        </div>
                    </div>
                    <div class="flex items-center justify-center rounded-md bg-violet-600 py-3 w-36 cursor-pointer">
                        <div class="text-white">
                            ورود
                        </div>
                        <div>
                            <SimpleUser class="fill-white w-4 h-4 mr-2"/>
                        </div>
                    </div>
                </div>
                <div class="flex items-center py-1 bg-white my-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                    <div class="">
                        <Phone class="w-5 h-5 fill-violet-400 mx-1" />
                    </div>
                    <div class="w-full">
                        <input v-model="loginForm.phoneNumber" name="phoneNumber" id="phoneNumber" class="form-input placeholder-violet-500" placeholder="تلفن">
                    </div>
                </div>
                <div class="flex items-center py-1 bg-white my-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                    <div class="">
                        <Password class="w-5 h-5 fill-violet-500 mx-1" />
                    </div>
                    <div class="w-full">
                        <input v-model="loginForm.password" name="password" id="password" type="password" class="form-input placeholder-violet-500" placeholder="پسورد">
                    </div>
                </div>
                <div class="my-6 px-6 ">
                    <div @click="login" class="flex items-center justify-center rounded-md bg-violet-600 py-3 w-full cursor-pointer">
                        <div class="text-white">
                            ورود
                        </div>
                        <div>
                            <SimpleUser class="fill-white w-4 h-4 mr-2"/>
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
import AddUser from '@/components/icons/AddUser.vue';
import Password from '@/components/icons/Password.vue';
import Phone from '@/components/icons/Phone.vue';
import SimpleUser from '@/components/icons/SimpleUser.vue';
import router from '@/router';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import Message from '@/components/message/Message.vue';
import type { UserLogin } from '@/common/typings/user.typing';
import { userLogin } from '@/common/config/axiox.config';

const userStore = useUserStore();
const page = reactive<Page>({
    message: '',
    typeMessage: TypeMessage.Success,
    showMessage: false,
});

const loginForm = reactive<UserLogin>({
    phoneNumber: '',
    password: '',
});

const goToSignup = () => {
    router.push('/signup');
};

const login =  async () => {
    try {
        const config = userLogin(loginForm);
        await userStore.login(config);
        router.push('/')
    } catch (error) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            page.message = getAxiosErrorMessage(error);
        } else {
            console.log(error);
        }
    }
};

</script>