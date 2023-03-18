<template>
    <div>
        <header/>
        <UserLinks/>
        <slot/>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UserLinks from '../Links/UserLinks.vue';
import GuestLinks from '../Links/GuestLinks.vue';
import AdminLinks from '../Links/AdminLinks.vue';

    // userIsLoggined: computed( () => store.getters['userAuth/checkAuth']),
    // adminIsLoggined: computed( () => store.getters['adminAuth/checkAuth'])
</script>