import type { Router } from "vue-router";

export const authUserGurd = (router: Router) => {
  return router.beforeEach((to, from, next) => {
    const userLoggedIn = !!localStorage.getItem('userAccessToken');
    if (to.meta.requiresAuthUser && !userLoggedIn) next({ path: '/login' })
    else next()
  })
};