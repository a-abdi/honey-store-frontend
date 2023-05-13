<template>
    <div class="sm:px-8 lg:flex">
        <div class="sticky mx-auto bottom-0 lg:static lg:top-0 bg-white lg:w-1/4 w-full">
            <div class="border border-gray-200 rounded-md mt-4 px-2">
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCartConfig, paymentConfig } from '@/common/config/axiox.config';
import { convertToPersian } from '@/common/helpers';
import Currency from '@/components/Currency.vue';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';
import router from '@/router';
const cartStore = useCartStore();
const userStore = useUserStore();
const orderStore = useOrderStore();
const getCartConfigAxios = getCartConfig();
cartStore.getCart(getCartConfigAxios);
const payment = async () => {
    const paymentConfigAxios = paymentConfig();
    await orderStore.paymentRequest(paymentConfigAxios);
    localStorage.removeItem('carts');
    const { transactionLink } = storeToRefs(orderStore);
    if (transactionLink.value) {
        window.location.href = transactionLink.value;
    }
};
</script>