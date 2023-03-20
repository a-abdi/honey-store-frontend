<template>
    <div class="form-base">
        <div class="form-design bg-slate-100">
           <form @submit.prevent="">
                <div class="flex justify-evenly text-xs lg:text-sm px-4 pt-12 pb-6 mb-6">
                    <div class="flex items-center justify-center rounded-md bg-slate-100 py-3 w-36">
                        <div  @click="goToSignup" class="text-violet-600 cursor-pointer">
                            ثبت نام
                        </div>
                        <div  @click="goToSignup">
                            <AddUser class="fill-violet-600 w-4 h-4 mr-2 cursor-pointer"/>
                        </div>
                    </div>
                    <div class="flex items-center justify-center rounded-md bg-violet-600 py-3 w-36 cursor-pointer">
                        <div class="text-white">
                            ورود
                        </div>
                        <div>
                            <SimpleUser class="fill-white w-4 h-4 mr-2"/>
                        </div>
                    </div>
                </div>
                <div class="flex items-center py-1 bg-white my-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                    <div class="">
                        <Phone class="w-5 h-5 fill-violet-400 mx-1" />
                    </div>
                    <div class="w-full">
                        <input name="phoneNumber" id="phoneNumber" class="form-input placeholder-violet-500" placeholder="تلفن">
                    </div>
                </div>
                <div class="flex items-center py-1 bg-white my-10 mx-6 text-gray-600 rounded-md shadow shadow-violet-200/50">
                    <div class="">
                        <Password class="w-5 h-5 fill-violet-500 mx-1" />
                    </div>
                    <div class="w-full">
                        <input name="password" id="password" type="password" class="form-input placeholder-violet-500" placeholder="پسورد">
                    </div>
                </div>
                <div class="my-6 px-6 ">
                    <div class="flex items-center justify-center rounded-md bg-violet-600 py-3 w-full cursor-pointer">
                        <div class="text-white">
                            ورود
                        </div>
                        <div>
                            <SimpleUser class="fill-white w-4 h-4 mr-2"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import AddUser from '@/components/icons/AddUser.vue';
import Password from '@/components/icons/Password.vue';
import Phone from '@/components/icons/Phone.vue';
import SimpleUser from '@/components/icons/SimpleUser.vue';
import router from '@/router';

const goToSignup = () => {
    router.push('/signup');
};

</script>