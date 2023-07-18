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
        <HalfPage>
          <template #text>
            گرده گل بهترین مکمل غذایی
          </template>
          <template #image>
            <img src="@/assets/garde.webp" class="mx-auto w-auto h-auto 2xl:max-h-60 xl-max-h-52 lg:max-h-44  md:max-h-36 sm:max-h-28 max-h-20" alt="">
          </template>
        </HalfPage>
        <HalfPage>
          <template #text>
            ژل رویال اکسیر جوانی 
          </template>
          <template #image>
            <img src="@/assets/royal1.jpg" class="mx-auto w-auto h-auto 2xl:max-h-60 xl-max-h-52 lg:max-h-44  md:max-h-36 sm:max-h-28 max-h-20" alt="">
          </template>
        </HalfPage>
      </div>
      <div class="grid grid-cols-6 my-8 gap-4">
        <div v-for="category in categoryListData?.data.slice(0, 6)" :key="category._id" class="xl:col-span-1 md:col-span-2 col-span-3 my-2">
          <div class="flex items-center">
            <img :src="category.imageSrc" alt="" class="object-cover sm:w-28 sm:h-28 w-20 h-20 mx-auto rounded-full">
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
import HalfPage from '@/components/show/HalfPage.vue';

const categoryStore = useCategoryStore();
const config = getCategoryListConfig();
categoryStore.getCategoryList(config);
const { categoryListData } = storeToRefs(categoryStore);

</script>