<template>
  <div>
    <div class="w-full md:flex md:px-0 px-4 py-2">
      <div class="md:w-4/12 w-full">
        <div class="md:mx-3 mx-1">
          <img class="mx-auto object-cover h-64 w-60" :src="productData?.data?.productImagesSrc[0]" alt="">
        </div>
        <div class="flex justify-center items-center mt-8 ">
          <div @click="showAdditionalsImage = true" class="mx-1 border border-gary-300 rounded-md p-2 cursor-pointer" v-for="additionalImage in productData?.data?.additionalsImageSrc">
            <img class="w-16 h-16 object-cover" :src="additionalImage" alt="">
          </div>
        </div>
        <ImageDialog :show-dialog="showAdditionalsImage" @cancel="closeAdditionalImage"> 
          <div class="w-full lg:flex ">
              <div class="lg:w-7/12 mt-12">
                <img class="object-cover w-72 h-96 rounded-md mx-auto" :src="additionalsImageUrl || productData?.data?.additionalsImageSrc[0]" alt="">
              </div>
              <div class="lg:w-5/12 lg:mt-0 flex flex-wrap justify-center items-center">
                <div class="mx-1 border border-gary-300 rounded-md p-2 cursor-pointer" v-for="additionalImage in productData?.data?.additionalsImageSrc">
                  <img @click="additionalsImageUrl = additionalImage" class="w-16 h-16 object-cover" :src="additionalImage" alt="">
                </div>
              </div>
          </div> 
        </ImageDialog>
      </div>
      <div class="md:w-8/12 w-full text-right mt-4">
        <div class="w-full flex items-center font-bold text-indigo-900 text-lg py-2">
          <div class="">
            {{ productData?.data?.name }}
          </div>
          <div v-if="commenStore.productScore" class="flex items-end">
            <Stare class="text-yellow-400"/>
            <div class="text-xs text-violet-600"> {{ commenStore.productScore }} </div>
          </div>
        </div>
        <div class="w-full md:flex">
          <div class="md:w-7/12 w-full py-4 border-t border-gray-300">
            <ShowProperties v-if="productData?.data?.customProperty" :show-file="true" :custom-properties="productData?.data?.customProperty"/>
          </div>
          <div class="md:w-5/12 w-full text-left">
            <div class="border border-gray-300 shadow-md rounded-md md:mx-2 py-4">
              <div v-if="productData?.data?.discount" class="flex items-center text-xs flex-row-reverse my-2 w-full">
                <div class="ml-2 bg-violet-500 text-white rounded-full p-1">
                  {{ convertToPersian(percentage) }}
                </div>
                <div class="pl-2 line-through text-gray-400">
                  <Currency :money="productData?.data?.price"/>
                </div>
              </div>
              <div class="flex items-center flex-row-reverse pl-4 my-2 ">
                <div class=" text-xs text-gray-500 pr-1">
                  تومان
                </div>
                <div class="text-xl">
                  <Currency :money="totalPrice"/>
                </div>
              </div>
              <div class="m-2">
                <div v-if="!cartStore.productCartExist(productId)">
                  <button v-if="productData?.data?.quantity" @click="addToCart" class="btn-violet w-full"> افزودن به سبد خرید </button>
                  <button v-if="!productData?.data?.quantity" disabled="true" class="btn-violet w-full"> این کالا موجود نمی باشد</button>
                </div>
                <ProductCartQuantity v-else :productId="productId"/>
              </div>
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
    </div>
    <div v-if="productData?.data?.description" class="text-gray-600 px-8 pt-8 pb-12 border-t-2 border-gray-200 sm:text-sm text-xs">
      <p class="underline underline-offset-8 decoration-violet-600 decoration-2 mb-4 text-bold text-base text-gray-900">
        معرفی
      </p>
      <p class="tracking-wide leading-loose text-indigo-900">
        {{ productData?.data?.description }}
      </p>
    </div>
    <Comment class="text-gray-600 px-8 pt-4 sm:text-sm text-xs border-t-2 border-gray-200"/>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { addToCartConfig, getProductConfig, getCartConfig, getCommentListAxiosConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';
import { computed } from '@vue/reactivity';
import { convertToPersian, getAxiosErrorMessage } from '@/common/helpers';
import { useCartStore } from '@/stores/cart';
import ProductCartQuantity from '@/components/ProductCartQuantity.vue';
import { useUserStore } from '@/stores/user';
import { provide, reactive, ref } from 'vue';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import Message from '@/components/message/Message.vue';
import type { NewProductCart } from '@/common/typings/cart.typings';
import ImageDialog from '@/components/dialog/ImageDialog.vue';
import ShowProperties from '@/components/ShowProperties.vue';
import Currency from '@/components/Currency.vue';
import Comment from '@/components/comment/Comment.vue';
import Stare from '@/components/icons/Stare.vue';
import { useCommentStore } from '@/stores/comment';
  const route = useRoute();
  const productId = route.params.productId as string;
  const productStore = useProductStore();
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const config = getProductConfig(productId);
  const commenStore = useCommentStore();
  const getCommentListConfig = getCommentListAxiosConfig(productId);
  commenStore.getCommentList(getCommentListConfig);
  productStore.getProduct(config);
  const { productData } = storeToRefs(productStore);
  const totalPrice = computed( () => productData.value?.data?.price! - productData.value?.data?.discount!);
  const percentage = computed( () => `${(Math.round((productData.value?.data?.discount! / productData.value?.data?.price!) * 1000) / 10)}%` );
  const additionalsImageUrl = ref(productData.value?.data?.additionalsImageSrc[0]);
  const showAdditionalsImage = ref(false);
  const page = reactive<Page>({
    message: '',
    typeMessage: TypeMessage.Success,
    showMessage: false,
  });
  const closeAdditionalImage = () => {
    showAdditionalsImage.value = false;
    additionalsImageUrl.value = undefined; 
  };
  provide('productId', productId);
  const addToCart = async () => {
    if ( productData.value?.data?.quantity && productData.value?.data?._id) {
      if (userStore.userLogged) {
        try {
          const product: NewProductCart = {
            quantity: 1,
            _id: productData.value?.data?._id
          };
          const products = [];
          products.push(product);
          const addToCartConfigAxios = addToCartConfig({products});
          await cartStore.addToCart(addToCartConfigAxios);
          const getCartConfigAxios = getCartConfig();
          await cartStore.getCart(getCartConfigAxios);
        } catch (error) {
          page.showMessage = true;
          page.typeMessage = TypeMessage.Danger;
          if (axios.isAxiosError(error)) {
              page.message = getAxiosErrorMessage(error);
          } else {
              console.log(error);
          }
        }
      } else {
        const product = productData.value?.data;
        cartStore.setListProductCart({ product, quantity: 1 });
      }
      cartStore.setCartLocalStorage();
    }
  };
</script>