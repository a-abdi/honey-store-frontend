<template>
  <div class="w-full sm:flex sm:px-0 px-4">
    <div class="sm:w-1/3 w-full">
      <div class="sm:mx-3 mx-1">
        <img class="mx-auto" :src="productData?.data?.imageSrc" alt="">
      </div>
    </div>
    <div class="sm:w-2/3 w-full text-right mt-4">
      <div class="w-full font-bold text-indigo-900 text-lg py-2">
        {{ productData?.data?.name }}
      </div>
      <div class="w-full sm:flex">
        <div class="sm:w-7/12 w-full py-4 border-t border-gray-300">
          <div class="text-gray-600 mr-2">
            <p>
              {{ productData?.data?.description }}
            </p>
          </div>
        </div>
        <div class="sm:w-5/12 w-full border border-gray-300 shadow-md rounded-md sm:mx-2 py-4 text-left">
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
              <button @click="addToCart" class="btn-violet w-full"> افزودن به سبد خرید </button>
            </div>
            <ProductCartQuantity v-else :productId="productId"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { getProductConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';
import { computed } from '@vue/reactivity';
import { convertToPersian } from '@/common/helpers';
import { useCartStore } from '@/stores/cart';
import ProductCartQuantity from '@/components/ProductCartQuantity.vue';


  const route = useRoute();
  const productId = route.params.productId as string;
  const productStore = useProductStore();
  const config = getProductConfig(productId);
  productStore.getProduct(config);
  const { productData } = storeToRefs(productStore);
  const totalPrice = computed( () => productData.value?.data?.price! - productData.value?.data?.discount!);
  const percentage = computed( () => `${(Math.round((productData.value?.data?.discount! / productData.value?.data?.price!) * 1000) / 10)}%` );
  const cartStore = useCartStore();
  const addToCart = () => {
    if (
      productData.value?.data?.name &&
      productData.value?.data?.price &&
      productData.value?.data?.imageSrc &&
      productData.value?.data?.quantity &&
      productData.value?.data?._id
    ) {
      const product = {
        name: productData.value?.data?.name!,
        price: productData.value?.data?.price!,
        discount: productData.value?.data?.discount,
        quantity: 1,
        imageSrc: productData.value?.data?.imageSrc!,
        _id: productData.value?.data?._id!
      };
      cartStore.setListProductCart(product);
      cartStore.setCartLocalStorage();
    }
  };
</script>