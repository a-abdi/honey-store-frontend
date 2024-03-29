<template>
  <div>
    <div v-if="productData">
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
        <div class="md:w-8/12 w-full mt-4">
          <div class="w-full text-indigo-900 text-lg py-2">
            <div class="">
              {{ productData?.data?.name }}
            </div>
          </div>
          <div class="w-full md:flex">
            <div class="md:w-7/12 my-4 md:my-0 w-full border-t border-gray-300">
              <div class="flex items-center">
                  <div v-if="commenStore.commentListData?.data.length" class="flex items-center mt-4">
                    <Stare v-if="commenStore.commentListData.data[0]?.scoreAverage" class="text-yellow-400 w-4 h-4"/>
                    <div v-if="commenStore.commentListData.data[0]?.scoreAverage" class="mt-0.5 text-xs text-gray-900"> 
                      {{ Math.round( commenStore.commentListData.data[0].scoreAverage * 10 ) / 10 }}
                    </div>
                    <div class="mt-0.5 text-xs text-indigo-900 pr-4">
                      {{ commenStore.commentListData.data[0]?.totalCount }}
                        دیدگاه
                    </div>
                </div>
              </div>
              <ShowProperties v-if="productData?.data?.customProperty" :show-file="true" :custom-properties="productData?.data?.customProperty"/>
            </div>
            <div class="w-5/12 md:block hidden">
              <ProductPrice :product-id="productId">
                <button :disabled="page.sending" @click="addToCart" v-if="productData?.data?.quantity" class="btn-violet md:w-full w-48 md:static absolute top-4 right-4">
                  <div v-if="!page.sending">
                    افزودن به سبد خرید
                  </div>
                  <LoadingIcone class="mx-auto text-white h-5 w-5" v-else/>
                </button>
              </ProductPrice>
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
        <p class="underline underline-offset-8 decoration-violet-600 decoration-2 mb-4 text-base text-gray-900">
          معرفی
        </p>
        <p class="tracking-wide leading-loose text-indigo-900">
          {{ productData?.data?.description }}
        </p>
      </div>
      <Comment class="text-gray-600 px-8 pt-4 sm:text-sm text-xs border-t-2 border-gray-200"/>
      <div class="sticky bottom-0 bg-white z-30">
        <div class="w-full border-t border-gray-200 md:hidden">
          <ProductPrice :product-id="productId">
            <button :disabled="page.sending" @click="addToCart" v-if="productData?.data?.quantity" class="btn-violet md:w-full w-48 md:static absolute top-4 right-4">
              <div v-if="!page.sending">
                افزودن به سبد خرید
              </div>
              <LoadingIcone class="mx-auto text-white h-5 w-5" v-else/>
            </button>
          </ProductPrice>
        </div>
      </div>
    </div>
    <PageLoading v-else/>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { addToCartConfig, getCartConfig } from '@/common/config/axios/cart.config';
import { getCommentListAxiosConfig } from '@/common/config/axios/comment.config';
import { getProductConfig } from '@/common/config/axios/product.config';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { defineAsyncComponent, provide, reactive, ref } from 'vue';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import type { NewProductCart } from '@/common/typings/cart.typings';
import ImageDialog from '@/components/dialog/ImageDialog.vue';
import ShowProperties from '@/components/ShowProperties.vue';
import Comment from '@/components/comment/Comment.vue';
import Stare from '@/components/icons/Stare.vue';
import { useCommentStore } from '@/stores/comment';
import ProductPrice from '@/components/ProductPrice.vue';
import PageLoading from '@/components/loading/PageLoading.vue';
import LoadingIcone from '@/components/icons/LoadingIcone.vue';
import { ErrorHander } from '@/helper/handel-error.helper';

const Message = defineAsyncComponent(() => import('@/components/message/Message.vue'));
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
const additionalsImageUrl = ref(productData.value?.data?.additionalsImageSrc[0]);
const showAdditionalsImage = ref(false);
const page = reactive<Page>({});
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
        page.sending = true;
        await cartStore.addToCart(addToCartConfigAxios);
        const getCartConfigAxios = getCartConfig();
        await cartStore.getCart(getCartConfigAxios);
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
      page.sending = false;
    } else {
      const product = productData.value?.data;
      cartStore.setListProductCart({ product, quantity: 1 });
    }
    cartStore.setCartLocalStorage();
  }
};
</script>