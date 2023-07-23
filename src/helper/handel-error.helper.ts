export class ErrorHander {
    static instance: ErrorHander;

    getMessage(error: any): string {
        if (Array.isArray(error?.response?.data?.message)) {
            return error.response?.data.message[0];
        }
        if (typeof error?.response?.data.Message === 'string') {
            return error.response?.data.Message;
        }
        return 'خطایی رخ داده'
    }

    public static getInstance(): ErrorHander {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}