import { useCommonStore } from "@/stores/common";
import type { Router } from "vue-router";

export const beforPageLoading = (router: Router) => {
    return router.beforeEach((to, from, next) => {
        const commonStore = useCommonStore();
        commonStore.pageLoadingToTrue();
        next()
    });
};
