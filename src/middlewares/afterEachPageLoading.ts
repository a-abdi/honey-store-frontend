import { useCommonStore } from "@/stores/common";
import type { Router } from "vue-router";

export const afterPageLoading = (router: Router) => {
    return router.afterEach(() => {
        const commonStore = useCommonStore();
        commonStore.PageLoadingToFalse();
    });
};
