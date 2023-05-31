<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-show="showDialog" class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="max-h-128">
                    <div class="relative mx-auto bg-white rounded-lg shadow-xl sm:w-5/12 w-full" role="dialog" ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                        <OnClickOutside @trigger="showDialog = false" class="sm:my-4 p-4">
                           <button @click="showDialog = false" class="absolute top-4 left-4 text-indigo-600 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"/></svg>
                            </button>
                           <div class="mt-10 pt-6 mb-6 border-t border-gray-300">
                                <slot>

                                </slot>
                           </div>
                        </OnClickOutside>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>   
</template>
<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
import { inject } from 'vue';
const showDialog = inject<boolean>('showDialog');
</script>