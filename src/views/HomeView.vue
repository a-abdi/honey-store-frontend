<template>
    <div class="px-4 py-1 mb-12">
      <div class="grid grid-cols-2 my-8">
        <div class="sm:col-span-1 col-span-full">
          <img src="@/assets/test.webp" alt="">
        </div>
        <div class="sm:col-span-1 col-span-full xl:pt-16 lg:pt-12 md:pt-8 sm:pt-4 py-2 text-indigo-600 bg-gradient-to-r from-indigo-50">
          <div class="">
            <p class="tracking-wider font-bold 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-normal mb-4">
              مطمئن تر و ارزان تر خرید کنید
            </p>
            <div class="space-y-3">
              <div class="flex items-center">
                <CheckCircleIcone class="ml-1" />
                <p class="tracking-wider 2xl:text-lg xl:text-normal lg:text-sm md:text-xs sm:text-vsl text-vs"> 
                  همراه برگ آزمایش و تایید کیفیت 
                </p>
              </div>
              <div class="flex items-center">
                <CheckCircleIcone class="ml-1" />
                <p class="tracking-wider 2xl:text-lg xl:text-normal lg:text-sm md:text-xs sm:text-vsl text-vs">  
                  صد درصد ارگانیک 
                </p>
              </div>
              <div class="flex items-center">
                <CheckCircleIcone class="ml-1" />
                <p class="tracking-wider 2xl:text-lg xl:text-normal lg:text-sm md:text-xs sm:text-vsl text-vs"> 
                  امکان مرجوع کالا 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HorizontalProduct class="my-8"/>
      <div class="grid grid-cols-2 my-8 gap-4">
        <HalfPage @click="gotToCategory(categoryListData?.data[0]?._id)" class="cursor-pointer">
          <template #text>
            {{ categoryListData?.data[0]?.description }}
          </template>
          <template #image>
            <img :src="categoryListData?.data[0]?.imageSrc" class="mx-auto w-auto h-auto 2xl:max-h-60 xl-max-h-52 lg:max-h-44  md:max-h-36 sm:max-h-28 max-h-20" alt="">
          </template>
        </HalfPage>
        <HalfPage @click="gotToCategory(categoryListData?.data[1]?._id)" class="cursor-pointer">
          <template #text>
            {{ categoryListData?.data[1]?.description }}
          </template>
          <template #image>
            <img :src="categoryListData?.data[1]?.imageSrc" class="mx-auto w-auto h-auto 2xl:max-h-60 xl-max-h-52 lg:max-h-44  md:max-h-36 sm:max-h-28 max-h-20" alt="">
          </template>
        </HalfPage>
      </div>
      <div class="grid grid-cols-6 my-8 gap-4">
        <div v-for="category in categoryListData?.data.slice(2, 8)" @click="gotToCategory(category._id)" :key="category._id" class="xl:col-span-1 md:col-span-2 col-span-3 my-2 cursor-pointer">
          <div class="flex items-center mx-auto sm:w-36 sm:h-36 w-28 h-28 rounded-full border border-indigo-200">
            <img :src="category.imageSrc" alt="" class="object-cover sm:w-24 sm:h-24 w-16 h-16 mx-auto">
          </div>
          <div class="text-center mt-4">
            <p class="text-indigo-900 text-sm"> {{ category.name }} </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import CheckCircleIcone from '@/components/icons/CheckCircleIcone.vue';
import HorizontalProduct from '@/components/show/HorizontalProduct.vue';
import { useCategoryStore } from '@/stores/category';
import { getCategoryListConfig } from '@/common/config/axios/category.config';
import { storeToRefs } from 'pinia';
import HalfPage from '@/components/show/HalfPage.vue';
import router from '@/router';

const categoryStore = useCategoryStore();
const config = getCategoryListConfig();
categoryStore.getCategoryList(config);
const { categoryListData } = storeToRefs(categoryStore);
const gotToCategory = (categoryId?: string) => {
  if (categoryId) {
    router.push(`/category/${categoryId}`);
  }
} 
</script>