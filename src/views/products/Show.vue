<template>
  <div class="w-full md:flex md:px-0 px-4">
    <div class="md:w-4/12 w-full">
      <div class="md:mx-3 mx-1">
        <img class="mx-auto" :src="productData?.data?.productImagesSrc[0]" alt="">
      </div>
      <div class="flex justify-center items-center mt-8 ">
        <div @click="showAdditionalsImage = true" class="mx-1 border border-gary-300 rounded-md p-2 cursor-pointer" v-for="additionalImage in productData?.data?.additionalsImageSrc">
          <img class="w-16 h-16 object-cover" :src="additionalImage" alt="">
        </div>
      </div>
      <ImageDialog :show-dialog="showAdditionalsImage" @cancel="showAdditionalsImage = false"> 
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
      <div class="w-full font-bold text-indigo-900 text-lg py-2">
        {{ productData?.data?.name }}
      </div>
      <div class="w-full md:flex">
        <div class="md:w-7/12 w-full py-4 border-t border-gray-300">
          <div v-for="property in productData?.data?.customProperty" class="text-sm">
            <div class="flex my-8">
              <div class="ml-2">
                {{ property.label }}:
              </div>
              <div v-if="property.type == 'file' && typeof property.value == 'string'">
                <DocumenPicture @click="showAttachImage[property.label] = true" class="w-6 h-6 cursor-pointer"/>
                <ImageDialog :show-dialog="showAttachImage[property.label]" @cancel="showAttachImage[property.label] = false"> 
                  <img :src="property.value" class="object-cover w-100 h-144 mx-auto" alt=""> 
                </ImageDialog>
              </div>
              <div v-if="property.type == 'number'" class=" text-violet-600">
                {{ property.value }}
              </div>
              <div v-if="property.type == 'text'" class=" text-violet-600">
                {{ property.value }}
              </div>
              <div class="mr-1 text-violet-600">
                {{ property.unit }}
              </div>
            </div>
          </div>
        </div>
        <div class="md:w-5/12 w-full text-left">
          <div class="border border-gray-300 shadow-md rounded-md md:mx-2 py-4">
            <div v-if="productData?.data?.discount" class="flex items-center text-xs flex-row-reverse my-2 w-full">
              <div class="ml-2 bg-violet-500 text-white rounded-full p-1">
                {{ convertToPersian(percentage) }}
              </div>
              <div class="pl-2 line-through text-gray-400">
                {{ convertToPersian(`${productData?.data?.price}`) }}
              </div>
            </div>
            <div class="flex items-center flex-row-reverse pl-4 my-2 ">
              <div class=" text-xs text-gray-500 pr-1">
                تومان
              </div>
              <div class="text-xl">
                {{ convertToPersian(`${totalPrice}`) }}
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
  <div v-if="productData?.data?.description" class="text-gray-600 px-4 pt-8 border-t border-gray-400">
    <p class="underline underline-offset-8 decoration-violet-600 decoration-2 mb-4 text-bold text-base text-gray-900">
      معرفی
    </p>
    <p class="sm:text-sm text-xs tracking-wide leading-8 text-indigo-900">
      {{ productData?.data?.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { addToCartConfig, getProductConfig, getCartConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';
import { computed } from '@vue/reactivity';
import { convertToPersian, getAxiosErrorMessage } from '@/common/helpers';
import { useCartStore } from '@/stores/cart';
import ProductCartQuantity from '@/components/ProductCartQuantity.vue';
import { useUserStore } from '@/stores/user';
import { reactive, ref } from 'vue';
import { TypeMessage, type Page, type StringBoolean } from '@/common/typings/common.typings';
import axios from 'axios';
import Message from '@/components/message/Message.vue';
import type { NewProductCart } from '@/common/typings/cart.typings';
import ImageDialog from '@/components/dialog/ImageDialog.vue';
import DocumenPicture from '@/components/icons/DocumenPicture.vue';
  const route = useRoute();
  const productId = route.params.productId as string;
  const productStore = useProductStore();
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const config = getProductConfig(productId);
  productStore.getProduct(config);
  const { productData } = storeToRefs(productStore);
  const totalPrice = computed( () => productData.value?.data?.price! - productData.value?.data?.discount!);
  const percentage = computed( () => `${(Math.round((productData.value?.data?.discount! / productData.value?.data?.price!) * 1000) / 10)}%` );
  const additionalsImageUrl = ref(productData.value?.data?.additionalsImageSrc[0]);
  const showAdditionalsImage = ref(false);
  const showAttachImage = reactive<StringBoolean>({});
  const page = reactive<Page>({
    message: '',
    typeMessage: TypeMessage.Danger,
    showMessage: false,
  });
  const addToCart = async () => {
    if (
      productData.value?.data?.name &&
      productData.value?.data?.price &&
      productData.value?.data?.productImagesSrc[0] &&
      productData.value?.data?.quantity &&
      productData.value?.data?._id
    ) {
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