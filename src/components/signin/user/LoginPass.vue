<template>
    <div>
        <form @submit.prevent="">
            <div class="flex justify-start text-xs lg:text-sm px-4 pt-12 pb-6 mb-6">
                <div class="bg-slate-100 py-3">
                    <p class="text-indigo-900">
                        رمز عبور را وارد کنید
                    </p>
                </div>
            </div>
            <div class="flex items-center py-1 bg-white my-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                <div class="">
                    <PasswordIcone class="w-5 h-5 fill-violet-500 mx-1"/>
                </div>
                <div class="w-full">
                    <slot></slot>
                </div>
            </div>
            <div class="my-6 px-6 ">
                <div class="rounded-md bg-violet-600 py-3 w-full">
                    <div @click="emits('login')" v-if="!sending" class="flex items-center justify-center cursor-pointer">
                        <button class="text-white">
                            ورود
                        </button>
                        <div>
                            <SimpleUser class="fill-white w-4 h-4 mr-2"/>
                        </div>
                    </div>
                    <LoadingIcone class="mx-auto text-white h-5 w-5" v-else/>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import PasswordIcone from '@/components/icons/PasswordIcone.vue';
import SimpleUser from '@/components/icons/SimpleUser.vue';
import LoadingIcone from '@/components/icons/LoadingIcone.vue';

defineProps<{sending: boolean | undefined}>();
const emits = defineEmits<{(event: 'login'): void}>();
</script>