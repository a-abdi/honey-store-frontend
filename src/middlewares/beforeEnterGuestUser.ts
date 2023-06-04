import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const guestUser = () => (to: RouteLocationNormalized, from: RouteLocationNormalized, next:  NavigationGuardNext) => {
    const userLoggedIn = !!localStorage.getItem('userAccessToken');
    if(userLoggedIn) {
        next('/')
    } else {
        next()
    }
}