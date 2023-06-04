import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const guestAdmin = () => (to: RouteLocationNormalized, from: RouteLocationNormalized, next:  NavigationGuardNext) => {
    const adminLoggedIn = !!localStorage.getItem('adminAccessToken');
    if(adminLoggedIn) {
        next('/admin/dashboard')
    } else {
        next()
    }
}