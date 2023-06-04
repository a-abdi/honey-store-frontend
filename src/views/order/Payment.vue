<template>
    <div class="lg:w-10/12 sm:w-11/12 sm:p-8 mt-4 flex justify-between border border-gray-200 rounded-md mx-auto">
        <div class="w-5/12">
            <div class="mb-6">
                <p class="underline underline-offset-8 decoration-violet-600 decoration-2 text-bold text-base text-gray-900">
                    آدرس گیرنده
                </p>
            </div>
            <div class="mb-6">
                <p class="tracking-wide leading-loose text-sm text-indigo-900">
                    {{ userData?.data?.address?.postalAddress}}
                </p>
            </div>
            <div class="tracking-wide leading-loose text-indigo-900">
                {{ userData?.data?.address?.recipient.phoneNumber.replace("+98", "0") }}
            </div>
             <div class="flex items-center">
                <button v-if="userData?.data?.address" @click="showUserAddress = true" class="px-8 btn-violet">
                    ویرایش آدرس
                </button>
                <button v-else @click="showUserAddress = true" class="px-8 btn-violet">
                    ثبت آدرس
                </button>
                <UserAddress :show-dialog="showUserAddress" @cancel="showUserAddress = false" @success="showUserAddress = false"/>
            </div>
        </div>
        <div class="bg-white lg:w-4/12">
            <div class="border border-gray-200 rounded-md px-2">
                <div class="py-1 font-bold text-indigo-900 text-lg">
                    جزئیات فاکتور
                </div>
                <div class="flex justify-between items-center px-2 py-4 text-gray-600 text-sm">
                    <div class="text-sm">
                        قیمت کالاها ({{ convertToPersian(`${cartStore.productCartCount}`) }})
                    </div>
                    <div class="flex items-center">
                        <Currency :money="cartStore.getSumAllPrice"/>
                        <div class="text-xs pr-1">
                            تومان
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center px-2 py-4 text-gray-800">
                    <div class="text-sm">
                        قابل پردخت
                    </div>
                    <div class="flex items-center">
                        <Currency :money="cartStore.getTotalPrice"/>
                        <div class="text-xs pr-1">
                            تومان
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center px-2 py-4 text-violet-600">
                    <div class="text-sm">
                        سود شما{{ convertToPersian(`(%${cartStore.getPercentage})`) }}
                    </div>
                    <div class="flex items-center">
                        <Currency :money="cartStore.getSumAllDiscount"/>
                        <div class="text-xs pr-1">
                            تومان
                        </div>
                    </div>
                </div>
                <div class="my-4">
                    <button @click="payment" v-if="userStore.userLogged" class="w-full btn-violet"> پردخت</button>
                </div>
            </div>
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
import { getCartConfig, paymentConfig } from '@/common/config/axiox.config';
import { convertToPersian, getAxiosErrorMessage } from '@/common/helpers';
import Currency from '@/components/Currency.vue';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';
import UserAddress from '@/components/UserAddress.vue';
import { reactive, ref } from 'vue';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import Message from '@/components/message/Message.vue';
const showUserAddress = ref(false);
const cartStore = useCartStore();
const userStore = useUserStore();
const orderStore = useOrderStore();
const { userData } = storeToRefs(userStore);
const getCartConfigAxios = getCartConfig();
const page = reactive<Page>({});
cartStore.getCart(getCartConfigAxios);
const payment = async () => {
    try {
        const paymentConfigAxios = paymentConfig();
        await orderStore.paymentRequest(paymentConfigAxios);
        const { transactionLink } = storeToRefs(orderStore);
        if (transactionLink.value) {
            window.location.href = transactionLink.value;
            cartStore.clearProductCart();
        }
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