<template>
    <div class="px-4 py-1 mb-12">
      <div class="flex my-8">
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
      <HorizontalProduct class="my-8"/>
      <div class="grid grid-cols-2 my-8 gap-4">
        <div class="md:col-span-1 col-span-full border border-gray-200 rounded-md flex justify-between bg-gradient-to-l from-indigo-50">
          <div class="md:p-20 p-10 w-1/2">
            <p class="traking-wider font-bold text-indigo-600 md:text-lg text-sm"> گرده گل بهترین مکمل غذایی </p>
          </div>
          <div class="w-1/2">
            <img src="@/assets/garde.webp" class="w-auto h-auto md:max-h-32" alt="">
          </div>
        </div>
        <!-- <HalfPage>
          <template #text>
            گرده گل بهترین مکمل غذایی
          </template>
          <template #image>
            <img src="@/assets/garde.webp" class="w-auto h-auto md:h-56" alt="">
          </template>
        </HalfPage> -->
        <div class="md:col-span-1 col-span-full border border-gray-200 rounded-md flex justify-between bg-gradient-to-l from-indigo-50">
          <div class="md:p-20 p-10 w-1/2">
            <p class="traking-wider font-bold text-indigo-600 md:text-lg text-sm"> ژل رویال اکسیر جوانی </p>
          </div>
          <div class="w-1/2">
            <img src="@/assets/royal1.jpg" class="w-auto h-auto md:h-56" alt="">
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6 my-8 gap-4">
        <div v-for="category in categoryListData?.data.slice(0, 6)" :key="category._id">
          <div class="flex items-center">
            <img :src="category.imageSrc" alt="" class="object-cover w-28 h-28 mx-auto rounded-full">
          </div>
          <div class="text-center mt-4">
            <p class="text-indigo-900 text-sm"> {{ category.name }} </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import PageLoading from '@/components/loading/PageLoading.vue';
import CheckCircleIcone from '@/components/icons/CheckCircleIcone.vue';
import HorizontalProduct from '@/components/show/HorizontalProduct.vue';
import { useCategoryStore } from '@/stores/category';
import { getCategoryListConfig } from '@/common/config/axios/category.config';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore();
const config = getCategoryListConfig();
categoryStore.getCategoryList(config);
const { categoryListData } = storeToRefs(categoryStore);

</script>