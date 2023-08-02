<template>
    <teleport to='body'>
        <transition enter-active-class="transition opacity-0 delay-100 ease-in duration-300 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-show="showAdminSidebar" class="fixed z-40 inset-0 overflow-y-auto bg-gray-300 bg-opacity-25">
                <div class="relative h-screen bg-white lg:w-64 w-full md:w-4/12 sm:w-5/12" role="dialog" ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                    <OnClickOutside @trigger="emit('cancel')">
                        <button @click="emit('cancel')" class="absolute top-4 left-4 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-500" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"/></svg>
                        </button>
                        <div class="pt-12 mb-6 text-indigo-900">
                            <div class="py-2 px-2 w-full bg-gray-50 text-indigo-900 tracking-wide sm:tracking-wider">
                                <!-- user link -->
                                <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/users'" @click="changeShow('user')"><p class="text-indigo-900"> کاربران </p></AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/users'" @click="emit('cancel')" class="pr-4" v-if="showLink.comment" > کاربران </AdminSidebarLink>
                                
                                <!-- product link -->
                                <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/products?deletedAt=false'" @click="changeShow('product')"><p class="text-indigo-900"> محصولات </p></AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/products?deletedAt=false'" @click="emit('cancel')" class="pr-4" v-if="showLink.product"> محصولات </AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/products?deletedAt=true'" @click="emit('cancel')" class="pr-4" v-if="showLink.product"> حذف شده </AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/products/create'" @click="emit('cancel')" class="pr-4" v-if="showLink.product"> ایجاد محصول </AdminSidebarLink>
                        
                                <!-- category link -->
                                <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/categories'" @click="changeShow('category')"><p class="text-indigo-900"> دسته ها </p></AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/categories'" @click="emit('cancel')" class="pr-4" v-if="showLink.category"> دسته ها</AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/categories/create'" @click="emit('cancel')" class="pr-4" v-if="showLink.category"> ایجاد دسته </AdminSidebarLink>
                        
                                <!-- property link -->
                                <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/properties'"  @click="changeShow('property')"><p class="text-indigo-900"> ویژگی ها </p></AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/properties'" @click="emit('cancel')" class="pr-4" v-if="showLink.property"> ویژگی ها </AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/properties/create'" @click="emit('cancel')" class="pr-4" v-if="showLink.property"> ایجاد ویژگی </AdminSidebarLink>
                                
                                <!-- order link -->
                                <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/orders?status=1'" @click="changeShow('order')"><p class="text-indigo-900"> سفارش ها  </p></AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=1'" @click="emit('cancel')" class="pr-4" v-if="showLink.order" > پرداخت شده </AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=3'" @click="emit('cancel')" class="pr-4" v-if="showLink.order"> ارسال شده </AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=5'" @click="emit('cancel')" class="pr-4" v-if="showLink.order"> تحویل شده </AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=2'" @click="emit('cancel')" class="pr-4" v-if="showLink.order"> لغو شده </AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=4'" @click="emit('cancel')" class="pr-4" v-if="showLink.order"> مرجوع شده </AdminSidebarLink>
                            
                                <!-- comment link -->
                                <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/comment'" @click="changeShow('comment')"><p class="text-indigo-900"> دیدگاه ها </p></AdminSidebarLink>
                                <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/comment'" @click="emit('cancel')" class="pr-4" v-if="showLink.comment" > تایید نشده </AdminSidebarLink>
                            </div>
                        </div>
                    </OnClickOutside>
                </div>
            </div>
        </transition>
    </teleport>   
</template>

<script lang="ts" setup>
import { OnClickOutside } from '@vueuse/components';
import AdminSidebarLink from '../user-link/AdminSidebarLink.vue';
import { reactive } from 'vue';

defineProps<{showAdminSidebar: boolean }>();
const emit = defineEmits<{(event: 'cancel'): void}>();
const showLink = reactive({
    user: false,
    order: false,
    product: false,
    category: false,
    property: false,
    comment: false,
});

const resetShowLink = () => {
    let key: keyof typeof showLink;
    for (key in showLink) {
        showLink[key] = false;
    }
};

const changeShow = (value: keyof typeof showLink) => {
    if (showLink[value]) {
        showLink[value] = false;
    } else {
        resetShowLink();
        showLink[value] = true;
    }
};
</script>