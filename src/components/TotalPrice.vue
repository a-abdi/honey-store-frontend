<template>
    <div class="" v-if="discount != 0 && discount">
        <div class="flex items-center justify-between py-2">
            <div class="bg-violet-500 text-xs text-white inline-flex rounded-full p-1 tracking-wider">
                {{ numberHelper.convertToPersian(percentage) }}
            </div>
            <div class="flex items-center text-indigo-900">
                <Currency :money="totalPrice" class="text-sm"/>
                <div class="text-vs pr-1">
                    تومان
                </div>
            </div>
        </div>
        <div class="pr-4 line-through text-gray-400 flex flex-row-reverse text-sm">
            <Currency :money="price" />
        </div> 
    </div>
    <div v-else class="flex flex-row-reverse pt-2 pb-8 text-indigo-900">
        <div class="flex items-center text-sm">
            <Currency :money="price" />
            <div class="text-vs pr-1">
                تومان
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Currency from './Currency.vue';
import { NumberHelper } from '@/helper/number.helper';

const numberHelper = NumberHelper.getInstance();
const props = defineProps<{price: number, discount: number}>();
const totalPrice = computed( () => props.price!  - props.discount!);
const percentage = computed( () => `${(Math.round((props.discount! / props.price!) * 1000) / 10)}%` );
</script>