import type { Router } from "vue-router";

export const authAdminrGurd = (router: Router) => {
  return router.beforeEach((to, from, next) => {
    const adminLoggedIn = !!localStorage.getItem('adminAccessToken');
    if (to.meta.requiresAuthAdmin && !adminLoggedIn) next({ path: '/admin/login' })
    else next()
  })
};