<template>
    <div>
        {{ currency }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
    const props = defineProps({
        money: Number
    });
    const money = props.money || 0;
    const currency = computed( () => (
            (money/1)
            .toFixed(2)
            .replace('.', ',')
        ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
</script>