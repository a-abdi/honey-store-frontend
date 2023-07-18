<template>
    <div class="relative">
        <div class="mx-3 mb-1">
            <p class="xl:text-lg md:text-normal text-sm font-bold text-indigo-900 tracking-wider">
                بیشترین تخفیف 
            </p>
        </div>
        <div @click="scroll('rtl')" v-if="hasLeftScroll"
            class="md:block hidden absolute top-36 left-4 lg:p-2 p-1 bg-white text-gray-600 border border-gray-300 rounded-full cursor-pointer">
            <BigLeft class="lg:w-5 lg:h-5 w-4 h-4" />
        </div>
        <div @click="scroll('ltr')" v-if="hasRightScroll"
            class="md:block hidden absolute top-36 right-4 lg:p-2 p-1 bg-white text-gray-600 border border-gray-300 rounded-full cursor-pointer">
            <BigLeft class="lg:w-5 lg:h-5 w-4 h-4 rotate-180" />
        </div>
        <div ref="showProducts" @mousedown="mousedown" @touchstart="touchStart"
            class="flex items-center overflow-x-hidden shadow">
            <div v-for="product in productListData?.data" ref="productBox" :key="product._id"
                class="mx-3 p-4 bg-neutral-50 shadow-2xl cursor-pointer">
                <div class="w-28 md:w-36 xl:w-44 2xl:52">
                    <img :src="product.productImagesSrc[0]" :alt="product.name" draggable="false"
                        class="mx-auto w-24 h-28 md:w-32 md:h-36 xl:w-40 xl:h-44 2xl:w-48 2xl:h-52 object-cover p-2">
                </div>
                <TotalPrice :price="product?.price" :discount="product?.discount" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getProductListConfig } from '@/common/config/axios/product.config';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import router from '@/router';
import TotalPrice from '@/components/TotalPrice.vue';
import { ref } from 'vue';
import BigLeft from '@/components/icons/BigLeft.vue';

const productBox = ref<HTMLDivElement[]>([]);
const scrollLeft = ref(0);
const hasLeftScroll = ref(true);
const hasRightScroll = ref(false);
const showProducts = ref<HTMLDivElement>();
const mousedown = (e: MouseEvent) => {
    const oldX = e.clientX;
    const scrollValue = scrollLeft.value;
    const mousemove = (e: MouseEvent) => {
        scrollLeft.value = oldX - e.clientX + scrollValue;
        if (showProducts.value) {
            handelScroll();
            showProducts.value.scrollLeft = scrollLeft.value;
        }
    };
    const mouseup = () => {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
    };
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
};

const scroll = (directionStroll: string) => {
    const productBoxWidth = productBox.value[0].clientWidth + 32;
    scrollLeft.value += directionStroll == 'rtl' ? -productBoxWidth : productBoxWidth;
    handelScroll();
    if (showProducts.value) {
        showProducts.value.scrollLeft = scrollLeft.value;
    }
};

const touchStart = (e: TouchEvent) => {
    const oldX = e.changedTouches[0].clientX;
    const scrollValue = scrollLeft.value;
    const touchMove = (e: TouchEvent) => {
        scrollLeft.value = oldX - e.changedTouches[0].clientX + scrollValue;
        if (showProducts.value) {
            handelScroll();
            showProducts.value.scrollLeft = scrollLeft.value;
        }
    };
    const touchend = () => {
        window.removeEventListener('touchmove', touchMove);
        window.removeEventListener('touchend', touchend);
    };
    window.addEventListener('touchmove', touchMove);
    window.addEventListener('touchend', touchend);
};

const handelScroll = () => {
    const minLeftScroll = window.innerWidth - (showProducts?.value?.scrollWidth || 0) - 50;
    if (scrollLeft.value > 0) {
        scrollLeft.value = 0;
        hasRightScroll.value = false;
    } else {
        hasRightScroll.value = true;
    }
    if (scrollLeft.value < minLeftScroll) {
        scrollLeft.value = minLeftScroll;
        hasLeftScroll.value = false;
    } else {
        hasLeftScroll.value = true;
    }
};

const productStore = useProductStore();
const getProductData = () => {
    const productFilter = `?sort=4`
    const config = getProductListConfig(productFilter);
    productStore.getProductList(config);
};
getProductData();
const { productListData } = storeToRefs(productStore);
const showProduct = (productId: string, productName: string) => router.push(`/products/${productId}/${productName.replace(/ /g, '-')}`);
</script>