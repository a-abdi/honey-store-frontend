<template>
    <div class="form-base-v-1">
        <div class="form-design-v-1 bg-slate-100">
            <div class="relative mt-10 flex justify-center">
                <RouterLink to="/">
                    <p class="text-indigo-900 font-bold text-lg">
                        هانی سایت
                    </p>
                </RouterLink>
                <div @click="showSendVerifyCode" :class="{'hidden': !hidden.sendVerifyCode}" class="absolute top-1 right-4 cursor-pointer">
                    <ArrowRight class="w-6 h-6 text-indigo-900"/>
                </div>
            </div>           
            <SendVerifyCode :sending="page.loading" :class="{'hidden': hidden.sendVerifyCode}" @sendCode="sendVerifyCode">
                <input v-model="newUser.phoneNumber" name="phoneNumber" id="phoneNumber"
                            class="form-input-v-1 placeholder-violet-500 text-indigo-900">
            </SendVerifyCode>
            <VerifyCode :sending="page.loading" :class="{'hidden': hidden.verifyCode}" @verify="verifyCode" @login-pass="showLoginPass" @resend-code="sendVerifyCode">
                <input v-model="code" name="verifyCode" id="verifyCode"
                            class="form-input-v-1 text-indigo-900 text-center tracking-[1em]">
            </VerifyCode>
            <LoginPassVue :sending="page.loading" :class="{'hidden': hidden.loginPass}" @login="loginWithPass">
                <input v-model="password" name="password" id="password" type="password" class="form-input-v-1 placeholder-violet-500">
            </LoginPassVue>
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
import { sendVerifyCodeSmsConfig, userLoginConfig, verifyCodeConfig } from '@/common/config/axios/user.config';
import type { NewUser } from '@/common/typings/user.typing';
import { reactive, ref, watch} from 'vue';
import { useUserStore } from '@/stores/user';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import Message from '@/components/message/Message.vue';
import { ErrorHander } from '@/helper/handel-error.helper';
import SendVerifyCode from '@/components/signin/user/SendVerifyCode.vue';
import VerifyCode from '@/components/signin/user/VerifyCode.vue';
import LoginPassVue from '@/components/signin/user/LoginPass.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';
import { useCartStore } from '@/stores/cart';
import { addToCartConfig } from '@/common/config/axios/cart.config';
import router from '@/router';

const userStore = useUserStore();
const cartStore = useCartStore();
const { verifyCodeData } = storeToRefs(userStore);
const page = reactive<Page>({loading: false});
const code = ref('');
const password = ref('');
const hidden = reactive({
    sendVerifyCode: false,
    verifyCode: true,
    loginPass: true,
});
const showSendVerifyCode = () => {
    hidden.sendVerifyCode = false;
    hidden.verifyCode = true;
    hidden.loginPass = true;
};
const showLoginPass = () => {
    hidden.sendVerifyCode = true;
    hidden.verifyCode = true;
    hidden.loginPass = false;
};
const showVerifyCode = () => {
    hidden.sendVerifyCode = true;
    hidden.verifyCode = false;
    hidden.loginPass = true;
};
const newUser = reactive<NewUser>({phoneNumber: ''});
const sendVerifyCode = async () => {
    try {
        const config = sendVerifyCodeSmsConfig(newUser);
        page.loading = true;
        code.value = '';
        await userStore.sendSms(config);
        showVerifyCode();
    } catch (error) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            const errorHander = ErrorHander.getInstance();
            page.message = errorHander.getMessage(error);
        } else {
            console.log(error);
        }
    }
    page.loading = false;
};
watch(
    () => code.value,
    codeValue => {
        if (codeValue.length > 5) {
            verifyCode();
            code.value = code.value.slice(0, 6);
        }
    }
);
const storeProductInCart = async () => {
    try {
        const productCartCount = cartStore.productCartCount;
        if( productCartCount > 0 ) {
            const { listProductsCart } = storeToRefs(cartStore);
            const products = [];
            if (listProductsCart?.value?.products) {
                for (let index = 0; index < listProductsCart?.value?.products.length; index++) {
                    const cartProduct = listProductsCart?.value?.products[index];
                    products.push({
                        _id: cartProduct.product._id,
                        quantity: cartProduct.quantity
                    });
                }
            }
            const addToCartConfigAxios = addToCartConfig({ products });
            await cartStore.addToCart(addToCartConfigAxios);
        }
    } catch (error) {
        console.log(error);
    }
};
const verifyCode = async () => {
    try {
        const config = verifyCodeConfig({
            phoneNumber: verifyCodeData.value?.data.phoneNumber, 
            code: code.value
        });
        page.loading = true;
        await userStore.verifyCode(config);
        storeProductInCart();
        page.loading = false;
        router.push('/');
    } catch (error) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            const errorHander = ErrorHander.getInstance();
            page.message = errorHander.getMessage(error);
        } else {
            console.log(error);
        }
    }
    page.loading = false;
};
const loginWithPass = async () => {
    try {
        const config = userLoginConfig({
            phoneNumber: verifyCodeData.value?.data.phoneNumber,
            password: password.value
        });
        page.loading = true;
        await userStore.login(config);
        storeProductInCart();
        page.loading = false;
        router.push('/');
    } catch (error) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            const errorHander = ErrorHander.getInstance();
            page.message = errorHander.getMessage(error);
        } else {
            console.log(error);
        }
    }
    page.loading = false;
};
</script>