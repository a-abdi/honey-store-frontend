<template>
    <div class="relative">
        <UserIcone @click="showProfile = true" class="w-8 h-8 text-gray-400 cursor-pointer"/>
        <OnClickOutside @trigger="showProfile = false">
            <div v-if="showProfile" class="absolute top-7 left-0 border border-gray-300 rounded-md shadow-lg bg-white h-auto overflow-auto max-h-128 w-64">
                Hello
            </div>
        </OnClickOutside>
    </div>
</template>
<script lang="ts" setup>
import UserIcone from '@/components/icons/UserLink.vue';
import { OnClickOutside } from '@vueuse/components'
import { ref } from 'vue';
const showProfile = ref(false);
</script>