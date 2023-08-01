<template>
    <div class="flex items-center justify-center">
        <div class="sm:mt-28 mt-16 py-6 sm:px-4 px-2 lg:w-1/3 md:w-8/12 sm:w-10/12 w-full border border-gray-200 rounded-md shadow-lg">
            <div class="sm:w-16 sm:h-16 w-10 h-10 mx-auto border border-gray-200 rounded-full bg-yellow-100">
                <WarningIcone class="mx-auto sm:w-12 sm:h-12 w-8 h-8 text-yellow-400 mt-1"/>
            </div>
            <div class="my-4">
                <p class="text-center text-indigo-900 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm font-bold">
                    پرداخت با خطا مواجه شد
                </p>
            </div>
            <div>
                <p class="2xl:text-2xl xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs text-center text-indigo-900 text-sm">
                     اگر سفارشی برای شما ثبت نشد بعد از 24 ساعت با ادمین در تماس باشید.
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import WarningIcone from '@/components/icons/WarningIcone.vue';

</script>