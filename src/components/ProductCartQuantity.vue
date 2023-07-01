<template>
    <div class="flex justify-between border border-gray-200 rounded-md shadow-lg p-2">
        <div class="mx-1">
            <Plus @click="updateProductQuantity(1)" class="sm:w-5 sm:h-5 w-4 h-4 fill-violet-600 cursor-pointer"/>
        </div>
        <div class="mx-4 text-violet-600">
            <div v-if="!page.sending">
                {{ convertToPersian(`${cartStore.getCartByProductId(prop.productId!)?.quantity}`) }}
            </div>
            <LoadingIcone class="mx-auto text-violet-600 h-5 w-5" v-else/>
        </div>
        <div v-if="cartStore.getQuantityProduct(productId!) > 1" @click="updateProductQuantity(-1)" class="mx-1">
            <Minus class="sm:w-5 sm:h-5 w-4 h-4 fill-violet-600 cursor-pointer"/>
        </div>
        <div v-if="cartStore.getQuantityProduct(productId!) === 1" @click="delteProductInCart">
            <Trash class="sm:w-5 sm:h-5 w-4 h-4 fill-violet-600 cursor-pointer" />
        </div>
        <Message class="absolute bottom-8 right-8 bg-gray-300" 
          :message="page.message"
          :showMessage="page.showMessage"
          :typeMessage="page.typeMessage"
          @fadeMessage="page.showMessage = false" 
        />
    </div>
</template>

<script setup lang="ts">
import { convertToPersian, getAxiosErrorMessage } from '@/common/helpers';
import { useCartStore } from '@/stores/cart';
import Plus from '@/components/icons/Plus.vue';
import Minus from '@/components/icons/Minus.vue';
import Trash from '@/components/icons/Trash.vue';
import { useUserStore } from '@/stores/user';
import { updateCartConfig, getCartConfig, removeProductFromCartConfig } from '@/common/config/axios/cart.config';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import { reactive } from 'vue';
import axios from 'axios';
import Message from './message/Message.vue';
import LoadingIcone from './icons/LoadingIcone.vue';

    const prop = defineProps({
        productId: String
    });
    const cartStore = useCartStore();
    const userStore = useUserStore();
    const page = reactive<Page>({
        sending: false,
        message: '',
        typeMessage: TypeMessage.Success,
        showMessage: false,
    });
    const updateProductQuantity = async (value: number) => {
        if (!page.sending) {
            if (userStore.userLogged) {
                const product = {
                    quantity: value
                } 
                if (cartStore.getCartByProductId(prop.productId!)?.quantity) {
                    product.quantity += cartStore.getCartByProductId(prop.productId!)?.quantity!;
                }
                try {
                    const updateCartConfigAxios = updateCartConfig(prop.productId!, {product});   
                    const getCartConfigAxios = getCartConfig();
                    page.sending = true;
                    await cartStore.updateCart(updateCartConfigAxios);
                    await cartStore.getCart(getCartConfigAxios);
                } catch (error) {
                    page.typeMessage = TypeMessage.Danger;
                    page.showMessage = true;
                    if (axios.isAxiosError(error)) {
                        page.message = getAxiosErrorMessage(error);
                    } else {
                        console.log(error);
                    }
                }
                page.sending = false;
            } else {
                const objIndex = cartStore.listProductsCart?.products.findIndex((productCart => productCart.product._id == prop.productId)) as number;
                if (cartStore.listProductsCart?.products[objIndex].quantity) {
                    cartStore.listProductsCart.products[objIndex].quantity += value;
                }
            }
            cartStore.setCartLocalStorage();
        }
    };

    const delteProductInCart = async () => {
        if (!page.sending) {
            if (userStore.userLogged) {
                try {
                    const removeFromCartConfigAxios = removeProductFromCartConfig(prop.productId!);   
                    const getCartConfigAxios = getCartConfig();
                    page.sending = true;
                    await cartStore.removeFromCart(removeFromCartConfigAxios);
                    await cartStore.getCart(getCartConfigAxios);
                } catch (error) {
                    page.typeMessage = TypeMessage.Danger;
                    page.showMessage = true;
                    if (axios.isAxiosError(error)) {
                        page.message = getAxiosErrorMessage(error);
                    } else {
                        console.log(error);
                    }
                }
                page.sending = false;
            } else {
                const objIndex = cartStore.listProductsCart?.products.findIndex((productCart => productCart.product._id == prop.productId)) as number;
                if (cartStore.listProductsCart?.products[objIndex].quantity) {
                    cartStore.listProductsCart.products.splice(objIndex, 1);
                }
            }
            cartStore.setCartLocalStorage();
        }
    }
</script>