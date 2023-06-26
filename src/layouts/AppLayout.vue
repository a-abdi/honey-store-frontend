<template>
    <component :is="layout">
        <slot/>
    </component>
</template>

<script setup lang="ts">
import AppLayoutDefault from './AppLayoutList/AppLayoutDefault.vue';
import { watch, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
const layout = shallowRef();
const route = useRoute();
watch (
    () => route.meta,
    async meta => {
        try {
            const component = await import(`./AppLayoutList/${meta.layout}.vue`);
            layout.value = component?.default || AppLayoutDefault;
        } catch (error) {
            layout.value = AppLayoutDefault;
        }
    },
);
</script>