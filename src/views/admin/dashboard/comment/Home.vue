<template>
    <div class="">
        <table class="table-auto w-full tracking-wider">
            <thead>
                <tr class="">
                    <th class="table-tr text-indigo-900">عنوان</th>
                    <th class="table-tr text-indigo-900"> متن </th>
                    <th class="table-tr text-indigo-900"> کاربر </th>
                    <th class="table-tr text-indigo-900"> خریدار </th>
                    <th class="table-tr text-indigo-900"> محصول </th>
                    <th class="table-tr text-indigo-900"> کد محصول </th>
                    <th class="table-tr text-indigo-900"> تاریخ ارسال </th>
                    <th class="table-tr text-indigo-900"> تایید</th>
                    <th class="table-tr text-indigo-900"> حذف </th>
                </tr>
            </thead>
            <tbody v-if="commentListDataNotVerify?.data">
                <tr v-for="( comment, index ) in commentListDataNotVerify.data" :key="comment._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td"> 
                        {{ comment.title }}
                    </td>
                    <td class="table-td"> 
                        {{ comment.text }}
                    </td>
                    <td class="table-td"> 
                        {{ comment.user.fullName }}
                    </td>
                    <td class="table-td"> 
                        {{ comment.user.buyer ? 'بلی' : 'خیر' }}
                    </td>
                    <td class="table-td"> 
                        {{ comment.product.name }}
                    </td>
                    <td class="table-td"> 
                        {{ comment.product.code }}
                    </td>
                    <td class="table-td"> 
                        {{ new Date(comment.createdAt).toLocaleDateString('fa-IR').replace(/\//g, '-') }}
                    </td>
                    <td class="table-td"> 
                        <Verify @click="showVerifyDialog[comment._id] = true" class="w-5 h-5 text-green-600 mx-auto cursor-pointer"/>
                        <Dialog v-if="showVerifyDialog[comment._id]" :showDialog="showVerifyDialog[comment._id]" @yes="verifyCommnet(comment._id, comment.product._id)"  @cancel=" showVerifyDialog[comment._id] = false">
                            <div class="text-right my-4 text-indigo-900">
                               <p>دیدگاه مورد نظر تایید شود؟</p>
                            </div>
                        </Dialog>
                    </td>
                    <td class="table-td"> 
                        <Trash @click="showDeleteDialog[comment._id] = true" class="w-5 h-5 fill-red-600 mx-auto cursor-pointer"/>
                        <Dialog v-if="showDeleteDialog[comment._id]" :showDialog="showDeleteDialog[comment._id]" @yes="deleteComment(comment._id, comment.product._id)"  @cancel="showDeleteDialog[comment._id] = false">
                            <div class="text-right my-4 text-indigo-900">
                               <p>دیدگاه مورد نظر حذف شود؟</p>
                            </div>
                        </Dialog>
                    </td>
                </tr>
            </tbody>
        </table>
        <PageLoading v-if="!commentListDataNotVerify"/>
    </div>
</template>

<script setup lang="ts">
import { useCommentStore } from '@/stores/comment';
import { storeToRefs } from 'pinia';
import { getCommentListNotVerifyAxiosConfig, updateCommentAdminAxiosConfig, deleteCommentAdminAxiosConfig} from '@/common/config/axiox.config';
import Verify from '@/components/icons/Verify.vue';
import Trash from '@/components/icons/Trash.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import { reactive } from 'vue';
import type { StringBoolean } from '@/common/typings/common.typings';
import PageLoading from '@/components/loading/PageLoading.vue';
const commentStore = useCommentStore();
const showVerifyDialog = reactive<StringBoolean>({});
const showDeleteDialog = reactive<StringBoolean>({});
const { commentListDataNotVerify } = storeToRefs(commentStore);
const getComment = () => {
    const config = getCommentListNotVerifyAxiosConfig();
    commentStore.getNotVerifyComment(config);
};
getComment();
const verifyCommnet = async (commentId: string, productId: string) => {
    showVerifyDialog[commentId] = false;
    const config = updateCommentAdminAxiosConfig(productId, commentId);
    await commentStore.updateCommentByAdmin(config);
    getComment();
};
const deleteComment = async (commentId: string, productId: string) => {
    showDeleteDialog[commentId] = false;
    const config = deleteCommentAdminAxiosConfig(productId, commentId);
    await commentStore.delteCommentByAdmin(config);
    getComment();
};
</script>