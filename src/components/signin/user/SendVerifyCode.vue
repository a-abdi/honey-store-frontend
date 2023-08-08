<template>
    <div>
        <form @submit.prevent="">
            <div class="flex justify-start text-xs lg:text-sm px-4 pt-12 pb-6 mb-10">
                <div class="flex items-center justify-center py-3 w-36">
                    <div class="text-indigo-600">
                        ورود | ثبت نام
                    </div>
                    <div>
                        <AddUser class="fill-indigo-600 w-4 h-4 mr-2" />
                    </div>
                </div>
            </div>
            <div class="mx-6">
                <p class="text-xs text-indigo-600 mb-3">
                    لطفا شماره موبایل خود را وارد کنید
                </p>
            </div>
            <div class="flex items-center py-1 bg-white mb-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                <div class="">
                    <Phone class="w-5 h-5 fill-violet-400 mx-1" />
                </div>
                <div class="w-full">
                    <slot></slot>
                </div>
            </div>
            <div class="mt-20 mb-10 px-6 ">
                <div @click="emits('sendCode')" class="rounded-md bg-violet-600 py-3 w-full cursor-pointer">
                    <div v-if="!sending" class="flex items-center justify-center">
                        <div class="text-white">
                            <button>
                                ورود
                            </button>
                        </div>
                        <div>
                            <AddUser class="fill-white w-4 h-4 mr-2" />
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
import AddUser from '@/components/icons/AddUser.vue';
import Phone from '@/components/icons/Phone.vue';

defineProps<{sending: boolean | undefined }>();
const emits = defineEmits<{(event: 'sendCode'): void}>()
</script>