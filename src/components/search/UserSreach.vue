<template>
    <OnClickOutside @trigger="changeShowSearch">
        <div @click="sreachHandel()" :class="{ 'bg-white': showSearch, 'bg-neutral-100': !showSearch }"
            class="flex items-center border border-gray-200 py-1.5 w-full rounded-md text-gray-600 sm:px-2 px-1 py-2">
            <div class="">
                <SearchIcone class="sm:w-7 sm:h-7 w-6 h-6 mx-1 ml-2 text-gray-400"/>
            </div>
            <div :class="{ 'hidden': showSearch, 'block': !showSearch }" class="md:text-xs sm:text-vsl text-vs bg-neutral-100">
                جستجو
            </div>
            <div class="w-full">
                <input v-model="searchValue" @keyup.enter="search" :class="{ 'w-0': !showSearch, 'w-full': showSearch }"  ref="input" :name="`userScearch${screen}`" :id="`userScearch${screen}`"
                    class="placeholder-gray-500 bg-white outline-none md:text-xs sm:text-vsl text-vs">
            </div>
        </div>
    </OnClickOutside>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import SearchIcone from '../icons/SearchIcone.vue';
import { OnClickOutside } from '@vueuse/components';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const input = ref<HTMLInputElement>();
const searchValue = ref('');
defineProps<{ screen?: string }>();
const showSearch = ref(false);
const sreachHandel = () => {
    showSearch.value = true;
    input.value?.focus();
};
const enableSearch = ref(false);
const changeShowSearch = () => {
    if (!enableSearch.value || !searchValue.value) {
        showSearch.value = false;
        enableSearch.value = false;
    }
};
watch(
    () => route.path,
    path => {
        if (path != '/search/') {
            showSearch.value = false;
            enableSearch.value = false;
            searchValue.value = '';
        } 
    }
);
if (route.path == '/search/' && route.query.q && typeof route.query.q == 'string') {
    searchValue.value = route.query?.q; 
    showSearch.value = true;
    enableSearch.value = true;    
}
const search = () => {
    enableSearch.value = true;
    router.push(`/search/?q=${searchValue.value}`);
};
</script>