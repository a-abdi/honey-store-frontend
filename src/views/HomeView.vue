<template>
    <div class="px-4 py-1">
      <div class="flex">
        <div>
          <img src="@/assets/test.webp" alt="">
        </div>
        <div class="mt-20 text-indigo-600">
          <p class="text-3xl font-bold tracking-wider mb-4">
            مطمئن تر و ارزان تر خرید کنید
          </p>
          <div class="space-y-3">
            <div class="flex items-center">
              <CheckCircleIcone class="ml-1" />
              <p> همراه برگ آزمایش و تایید کیفیت </p>
            </div>
            <div class="flex items-center">
              <CheckCircleIcone class="ml-1" />
              <p> بزرگ ترین تولید کننده عسل طبیعی </p>
            </div>
            <div class="flex items-center">
              <CheckCircleIcone class="ml-1" />
              <p> امکان مرجوع کالا </p>
            </div>
          </div>
        </div>
      </div>
      <div class="my-8">
        <div class="mx-3 mb-1">
          <p class="text-lg font-bold text-indigo-600 tracking-wider"> بیشترین تخفیف </p>
        </div>
        <div ref="showProducts" @mousedown="mousedown" class="flex items-center overflow-x-hidden">
          <div v-for="product in productListData?.data" :key="product._id" class="mx-3 p-4 border border-gray-200 bg-neutral-50 shadow-md cursor-pointer">
            <div class="w-28 md:w-36 xl:w-44 2xl:52">
              <img :src="product.productImagesSrc[0]" :alt="product.name" draggable="false" class="mx-auto w-24 h-28  md:w-32 md:h-36 xl:w-40 xl:h-44 2xl:w-48 2xl:h-52 object-cover p-2">
            </div>
            <TotalPrice :price="product?.price" :discount="product?.discount" />
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { getProductListConfig } from '@/common/config/axios/product.config';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import router from '@/router';
import PageLoading from '@/components/loading/PageLoading.vue';
import { useRoute } from 'vue-router';
import TotalPrice from '@/components/TotalPrice.vue';
import { ref } from 'vue';
import CheckCircleIcone from '@/components/icons/CheckCircleIcone.vue';

const scrollLeft = ref(0);
const testTouch = (e: TouchEvent) => {
  console.log(e);
  
};
const showProducts = ref<HTMLDivElement>();
const mousedown = (e: MouseEvent) => {
  const oldX = e.clientX;
  const scrollValue = scrollLeft.value;
  const mousemove = (e: MouseEvent) => {
    scrollLeft.value = oldX - e.clientX + scrollValue;
    if (showProducts.value) {
      scrollLeft.value > 0 && (scrollLeft.value = 0);
      const minLeftScroll = window.innerWidth - showProducts.value?.scrollWidth - 50;
      scrollLeft.value < minLeftScroll && ( scrollLeft.value = minLeftScroll );
      showProducts.value.scrollLeft = scrollLeft.value;
    }
  };
  const mouseup = () => {
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  };
  window.addEventListener('mousemove', mousemove)
  window.addEventListener('mouseup', mouseup)
};

const productStore = useProductStore();
const route = useRoute();
const getProductData = () => {
    const productFilter = `?sort=4`
    const config = getProductListConfig(productFilter);
    productStore.getProductList(config);
};
getProductData();
const { productListData } = storeToRefs(productStore);
const showProduct = (productId: string, productName: string) => router.push(`/products/${productId}/${productName.replace(/ /g, '-')}`);
</script>