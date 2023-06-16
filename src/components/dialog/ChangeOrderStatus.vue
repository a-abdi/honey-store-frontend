<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="relative lg:mx-auto bg-white rounded-lg shadow-xl md:w-6/12 w-full sm:my-4 p-4 mx-auto" role="dialog"
                    ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                    <button @click="emit('cancel')" class="absolute top-4 left-4 text-indigo-600 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z" />
                        </svg>
                    </button>
                    <div class="mt-10 pt-6 mb-4 border-t border-gray-300">
                        <div class="text-indigo-900 tracking-wider md:text-base sm:text-sm text-vsl">
                            وضعیت سفارش را به <span class="text-red-600">{{ orderStore.statusList[Number(statusValue)]
                            }}</span> تغییر می دهید؟
                        </div>
                        <div class="flex items-center flex-row-reverse mt-6">
                            <button @click="changeStatus" class="btn-red mx-2 sm:text-sm text-vsl">
                                بلی
                            </button>
                            <button @click="emit('cancel')" class="btn-violet mx-2 sm:text-sm text-vsl">
                                خیر
                            </button>
                        </div>
                    </div>
                    <Message class="absolute bottom-0 right-0 bg-gray-300" :message="page.message"
                        :showMessage="page.showMessage" :typeMessage="page.typeMessage"
                        @fadeMessage="page.showMessage = false" />
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/order';
import { OnClickOutside } from '@vueuse/components';
import { updateOrderStatusAxiosConfig } from '@/common/config/axiox.config';
import { reactive } from 'vue';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import Message from '../message/Message.vue';
const emit = defineEmits(['cancel', 'orderIsUpdated']);
const props = defineProps<{ statusValue: string, orderId: string }>();
const orderStore = useOrderStore();
const page = reactive<Page>({});
const changeStatus = async () => {
    try {
        const updateConfig = updateOrderStatusAxiosConfig(props.orderId, { status: props.statusValue });
        await orderStore.updateAdminOrders(updateConfig);
        emit('orderIsUpdated');
    } catch (error) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            page.message = getAxiosErrorMessage(error);
        } else {
            console.log(error);
        }
    }
}
</script>