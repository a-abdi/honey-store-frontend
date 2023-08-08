<template>
    <div>
        <form @submit.prevent="">
            <div class="flex justify-start text-xs lg:text-sm px-4 pt-12 pb-6 mb-6">
                <div class="bg-slate-100 py-3">
                    <p class="text-indigo-900">
                        رمز عبور را وارد کنید
                    </p>
                </div>
            </div>
            <div class="flex items-center py-1 bg-white my-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                <div class="">
                    <PasswordIcone class="w-5 h-5 fill-violet-500 mx-1"/>
                </div>
                <div class="w-full">
                    <input v-model="loginForm.password" name="password" id="password" type="password" class="form-input-v-1 placeholder-violet-500" placeholder="پسورد">
                </div>
            </div>
            <div class="my-6 px-6 ">
                <div class="rounded-md bg-violet-600 py-3 w-full">
                    <div v-if="!page.loading" @click="login" class="flex items-center justify-center cursor-pointer">
                        <div class="text-white">
                            ورود
                        </div>
                        <div>
                            <SimpleUser class="fill-white w-4 h-4 mr-2"/>
                        </div>
                    </div>
                    <LoadingIcone class="mx-auto text-white h-5 w-5" v-else/>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import PasswordIcone from '@/components/icons/PasswordIcone.vue';
import SimpleUser from '@/components/icons/SimpleUser.vue';
import router from '@/router';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import type { UserLogin } from '@/common/typings/user.typing';
import { addToCartConfig } from '@/common/config/axios/cart.config';
import { userLoginConfig } from '@/common/config/axios/user.config';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import LoadingIcone from '@/components/icons/LoadingIcone.vue';
import { ErrorHander } from '@/helper/handel-error.helper';

const userStore = useUserStore();
const cartStore = useCartStore();
const page = reactive<Page>({
    loading: false,
    message: '',
    typeMessage: TypeMessage.Success,
    showMessage: false,
});

const loginForm = reactive<UserLogin>({
    phoneNumber: '',
    password: '',
});

const login =  async () => {
    try {
        const userLoginConfigAxios = userLoginConfig(loginForm);
        page.loading = true;
        await userStore.login(userLoginConfigAxios);
        const productCartCount = cartStore.productCartCount;
        try {
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