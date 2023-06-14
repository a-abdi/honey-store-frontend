<template>
  <div class="md:border border-gray-300 shadow-md rounded-md md:mx-2 py-4">
    <div v-if="productData?.data?.discount" class="flex items-center text-vsl flex-row-reverse my-2 w-full">
      <div class="ml-2 bg-violet-500 text-white rounded-full p-1">
        {{ convertToPersian(percentage) }}
      </div>
      <div class="pl-2 line-through text-gray-400">
        <Currency :money="productData?.data?.price" />
      </div>
    </div>
    <div class="flex items-center flex-row-reverse pl-4 my-2 ">
      <div class=" text-xs text-gray-500 pr-1">
        تومان
      </div>
      <div class="md:text-xl text-sm">
        <Currency :money="totalPrice" />
      </div>
    </div>
    <div class="m-2">
      <div v-if="!cartStore.productCartExist(productId) && productData?.data?.quantity">
        <button v-if="productData?.data?.quantity" @click="emit('addTocart')" class="btn-violet md:w-full w-48 md:static absolute top-8 right-4">
          افزودن به سبد خرید
        </button>
        <button v-if="productData?.data?.quantity <= 0 || productData.data.deletedAt" disabled="true"
          class="btn-violet md:w-full w-48 md:static absolute top-8 right-4 cursor-not-allowed">
          این کالا موجود نمی باشد
        </button>
      </div>
      <ProductCartQuantity v-else :productId="productId" class="md:w-full w-48 md:static absolute top-8 right-4"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { convertToPersian } from '@/common/helpers';
import { useCartStore } from '@/stores/cart';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import ProductCartQuantity from './ProductCartQuantity.vue';
import Currency from './Currency.vue';

defineProps<{ productId: string }>();
const emit = defineEmits<{ (event: 'addTocart'): void }>();
const productStore = useProductStore();
const { productData } = storeToRefs(productStore);
const totalPrice = computed(() => productData.value?.data?.price! - productData.value?.data?.discount!);
const percentage = computed(() => `${(Math.round((productData.value?.data?.discount! / productData.value?.data?.price!) * 1000) / 10)}%`);
const cartStore = useCartStore();
</script>