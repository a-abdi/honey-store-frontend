<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-show="showDialog" class="fixed z-40 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="flex items-start justify-center min-h-screen sm:pt-24 text-center">
                    <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl p-4 md:w-1/2 sm:w-2/3 w-11/12" role="dialog" ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                       <button @click="emit('cancel')" class="absolute top-4 left-4 text-violet-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"/></svg>
                        </button>
                       <div class="mt-10 mb-12 text-xs md:text-sm">
                           <slot>Content</slot>
                       </div>
                       <div class="flex flex-row-reverse text-xs md:text-sm mb-4">
                           <button @click="emit('yes')" class="btn-red-hollow mx-2 text-vs sm:text-sm sm:w-24 w-16">بله</button>
                           <button @click="emit('cancel')" class="btn-blue-hollow mx-2 text-vs sm:text-sm sm:w-24 w-16">خیر</button>
                       </div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>   
</template>

<script setup lang="ts">
defineProps<{showDialog: boolean}>();
const emit = defineEmits<{(event: 'cancel'): void, (event: 'yes'): void }>();
</script>