<template>
    <div>
        <form @submit.prevent="">
            <div :class="{'justify-evenly': verifyCodeData?.data.hasPass}" class="flex px-4 pt-12 pb-6 mb-6">
                <div class="bg-slate-100 py-3">
                    <div class="text-indigo-900">
                        کد تایید را وارد کنید
                    </div>
                </div>
                <div @click="emits('loginPass')" v-if="verifyCodeData?.data.hasPass" class="flex items-center justify-center rounded-md bg-violet-600 py-3 w-36 cursor-pointer">
                    <p class="text-white text-xs lg:text-sm">
                        ورود با پسورد
                    </p>
                </div>
            </div>
            <div class="mx-6">
                <p class="text-xs text-indigo-600 mb-3">
                    کد تایید برای شماره {{ verifyCodeData?.data.phoneNumber.replace('+98', '0') }} پیامک شد
                </p>
            </div>
            <div class="flex items-center py-1 bg-white mb-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                <div class="w-full">
                    <slot></slot>
                </div>
            </div>
            <div class="flex justify-center">
                <Timer v-if="!timerEnd" @timer-end="timerEnd = true" :time="Number(verifyCodeData?.data.smsTtl)">
                    مانده تا دریافت مجدد کد
                </Timer>
                <div v-else class="cursor-pointer">
                    <p class="text-indigo-500">
                        ارسال مجدد کد تایید
                    </p>
                </div>
            </div>
            <div class="my-10 px-6">
                <div @click="emits('verify')" class="rounded-md bg-violet-600 py-3 w-full cursor-pointer">
                    <div v-if="!page.loading" class="flex items-center justify-center">
                        <div class="text-white">
                            <button>
                                تایید
                            </button>
                        </div>
                    </div>
                    <LoadingIcone class="mx-auto text-white h-5 w-5" v-else />
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import LoadingIcone from '@/components/icons/LoadingIcone.vue';
import { reactive, ref, watch } from 'vue';
import type { Page } from '@/common/typings/common.typings';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import Timer from '@/components/time/Timer.vue';

const userStore = useUserStore();
const { verifyCodeData } = storeToRefs(userStore);
const page = reactive<Page>({});
const timerEnd = ref(false);
const emits = defineEmits<{
    (event: 'verify'): void,
    (event: 'loginPass'): void,
}>();
watch(
    () => verifyCodeData.value?.data.smsTtl,
    () => timerEnd.value = false,
);
</script>