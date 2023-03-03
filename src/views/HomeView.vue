<template>
  <LoginForm 
  :storeLogin="'adminAuth/login'" 
  :forgotPasswordLink="'/admin/forgot-password'"
  :routerPushName="'Admin/Dashboard/Index'">
      Admin Login
  </LoginForm>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'

</script>