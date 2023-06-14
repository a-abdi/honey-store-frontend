<template>
    <div>
        <p class="underline underline-offset-8 decoration-violet-600 decoration-2 mb-4 text-bold text-base text-gray-900">
            دیدگاه ها
        </p>
        <div class="py-8">
            <button @click="addComment" class="w-full sm:w-64 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-12 border border-indigo-500 hover:border-transparent rounded-md">
                افزودن دیدگاه
            </button>
            <CreateComment v-if="showCreateComment" @cancel="showCreateComment = false"/>
        </div>
        <div v-if="commentListData?.data.length">
            <div v-for="comment in commentListData.data[0].comments" class="px-4 py-3 border border-gray-200 my-4 rounded-md">
                <div class="flex items-center my-6">
                    <div v-if="comment.score" class="bg-violet-600 text-white mx-1 px-2 py-1 text-xs rounded-md">
                        {{ comment.score }}
                    </div>
                    <div v-if="comment.title" class="text-base text-indigo-900 font-bold mx-1">
                        {{ comment.title }}
                    </div>
                </div>
                <div class="flex items-center my-6">
                    <div class="text-gray-600 mx-3 text-xs">
                        {{ new Date(comment.createdAt).toLocaleDateString('fa-IR') }}
                    </div>
                    <div v-if="comment.user.fullName !== 'کاربر'" class="text-gray-600 mx-3 text-xs">
                        {{  comment.user.fullName }}
                    </div>
                    <div v-if="comment.user.buyer" class="text-indigo-900">
                        خریدار
                    </div>
                    <div v-else>
                        کاربر 
                    </div>
                </div>
                <div class="my-6">
                    <p class="tracking-wide leading-loose text-indigo-900">
                        {{ comment.text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import CreateComment from '../dialog/CreateComment.vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { useCommentStore } from '@/stores/comment';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const commenStore = useCommentStore();
const { commentListData } = storeToRefs(commenStore);
const addComment = () => {
    if (userStore.userLogged) {
        showCreateComment.value = true;
    } else {
        router.push('/login')
    }
};
const showCreateComment = ref(false);
</script>