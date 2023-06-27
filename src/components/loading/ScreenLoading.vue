<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="loading" class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="relative bg-white mt-16" role="dialog" ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                    <div class="flex justify-center items-center h-screen w-full">
                        <loading-icone class="w-8 h-8"/>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>   
</template>

<script setup lang="ts">
import LoadingIcone from '../icons/LoadingIcone.vue';

defineProps<{loading: boolean}>();
</script>