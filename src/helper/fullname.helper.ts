import type { UserData } from "@/common/typings/user.typing";

export class FullNameHepler {
    static instance: FullNameHepler;

    getUserFullName = (user: UserData) => {
        if (user.data?.firstName && user.data?.lastName) {
            return `${user.data?.firstName} ${user.data?.lastName}`
        }
        if (user.data?.firstName) {
            return `${user.data?.firstName}`
        }
        if (user.data?.lastName) {
            return `${user.data.lastName}`
        }
        return 'کاربر';
    };

    public static getInstance(): FullNameHepler {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}