<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="max-h-128">
                    <div class="relative mx-auto bg-white rounded-lg shadow-xl sm:w-5/12 w-full" role="dialog" ref="modal"
                        aria-modal="true" aria-labelledby="modal-headline">
                        <OnClickOutside @trigger="emit('cancel')" class="sm:my-4 p-4">
                            <button @click="emit('cancel')"
                                class="absolute top-4 left-4 text-indigo-600 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z" />
                                </svg>
                            </button>
                            <div class="mt-10 pt-6 mb-6 border-t border-gray-300">
                                <form @submit.prevent="">
                                    <div class="">
                                        <div class="w-full text-center mb-4 text-sm text-gray-600">امتیاز دهید</div>
                                        <div class="flex items-center justify-center text-center w-full">
                                            <div class="mx-2">
                                                <button @click="newComment.score = 1" :class="{'bg-indigo-500': newComment.score == 1, 'text-white': newComment.score == 1}" class="btn-radio-indigo">
                                                    خیلی بد
                                                </button>
                                            </div>
                                            <div class="mx-2">
                                                <button @click="newComment.score = 2" :class="{'bg-indigo-500': newComment.score == 2, 'text-white': newComment.score == 2}" class="btn-radio-indigo">
                                                    بد
                                                </button>
                                            </div>
                                            <div class="mx-2">
                                                <button @click="newComment.score = 3" :class="{'bg-indigo-500': newComment.score == 3, 'text-white': newComment.score == 3}" class="btn-radio-indigo">
                                                    معمولی
                                                </button>
                                            </div>
                                            <div class="mx-2">
                                                <button @click="newComment.score = 4" :class="{'bg-indigo-500': newComment.score == 4, 'text-white': newComment.score == 4}" class="btn-radio-indigo">
                                                    خوب
                                                </button>
                                            </div>
                                            <div class="mx-2">
                                                <button @click="newComment.score = 5" :class="{'bg-indigo-500': newComment.score == 5, 'text-white': newComment.score == 5}" class="btn-radio-indigo">
                                                    عالی
                                                </button>
                                            </div>
                                        </div>
                                        <div class="my-6">
                                            <label class="text-indigo-900 text-xs p-2 tracking-wider" for="tiltle">عنوان</label>
                                            <div class="w-full py-1 mt-1 bg-white text-gray-600 border border-gray-200 rounded-md shadow shadow-violet-200/50">
                                                <input v-model="newComment.title" name="title" id="title" type="text" class="form-input-v-1 text-sm text-indigo-900">
                                            </div>
                                        </div>
                                        <div class="my-6">
                                            <label class="text-indigo-900 text-xs p-2 tracking-wider" for="tiltle">متن نظر</label>
                                            <textarea v-model="newComment.text" class="p-2 mt-1 text-xs text-indigo-900 resize-y border rounded-md w-full h-10 sm:h-16 md:h-24 xl:h-28 focus:outline-none">
                                            </textarea>
                                        </div>
                                        <div>
                                            <button @click="createComment" class="w-full btn-violet text-sm">
                                                ثبت دیدگاه
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <Message class="absolute bottom-0 right-0 bg-gray-300" 
                                    :message="page.message"
                                    :showMessage="page.showMessage"
                                    :typeMessage="page.typeMessage"
                                    @fadeMessage="page.showMessage = false" 
                                />
                            </div>
                        </OnClickOutside>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import type { NewComment } from '@/common/typings/comment.typings';
import { useCommentStore } from '@/stores/comment';
import { OnClickOutside } from '@vueuse/components';
import { storeToRefs } from 'pinia';
import { inject, reactive } from 'vue';
import { createCommentAxiosConfig } from '@/common/config/axiox.config';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import Message from '../message/Message.vue';
const emit = defineEmits(['cancel']);
const page = reactive<Page>({});
const newComment = reactive<NewComment>({text: ''});
const commenStore = useCommentStore();
const { commentData } = storeToRefs(commenStore);
const productId = inject<string>('productId');
const createComment = async () => {
    try {
        if (productId) {
            const commentConfig = createCommentAxiosConfig(productId, newComment);
            await commenStore.createComment(commentConfig);
            page.showMessage = true;
            page.typeMessage = TypeMessage.Success;
            page.message = commentData.value?.message;
        } else {
            page.showMessage = true;
            page.typeMessage = TypeMessage.Danger;
            page.message = 'خطایی پیش اومده';
        }
    } catch (error) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            page.message = getAxiosErrorMessage(error);
        } else {
            console.log(error);
        }
    }
};
</script>