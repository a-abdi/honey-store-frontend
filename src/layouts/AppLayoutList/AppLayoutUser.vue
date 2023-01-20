<template>
    <div id="xxxxxxxxxxxx">
        <header/>
        <!-- <AdminLinks /> -->
        <UserLinks />
        <slot/>
    </div>
</template>

<script lang="ts">
    export default {
        name: "AppLayoutHome",
    }
</script>

<script setup lang="ts">
    import UserLinks from '../Links/UserLinks.vue'
    import GuestLinks from '../Links/GuestLinks.vue'
    import AdminLinks from '../Links/AdminLinks.vue'
    // userIsLoggined: computed( () => store.getters['userAuth/checkAuth']),
    // adminIsLoggined: computed( () => store.getters['adminAuth/checkAuth'])
</script>