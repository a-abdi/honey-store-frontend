<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-show="loading" class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="flex items-start justify-center min-h-screen sm:pt-24 text-center">
                    <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl p-4 md:w-1/2 sm:w-2/3 w-11/12" role="dialog" ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                        <div class="flex justify-center items-center h-screen bg-white-100">
                            <loading-icone class="w-8 h-8"/>
                        </div>
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