<template>
    <div class="text-center text-indigo-900">
        {{ `0${secondes}`.slice(-2) }} : {{ `0${minutes}`.slice(-2) }}
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps<{time: number}>();
const timer = ref(props.time);
const emits = defineEmits<{(event: 'timerEnd'): void}>();
watch(
    () => props.time,
    time => {
        timer.value = time
    }
);
watch(
    () => timer.value,
    timer => {
        if (timer == 0) {
            emits('timerEnd')
        }
    }
);
setInterval(() => {
    if (timer.value) {
        timer.value -= 1; 
    }
}, 1000);
const minutes = computed(
    () => Math.floor(timer.value / 60)
);
const secondes = computed(
    () => timer.value - (60 * (minutes.value || 0))
);
</script>