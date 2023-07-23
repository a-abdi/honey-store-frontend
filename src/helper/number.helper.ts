export class NumberHelper {
    static instance: NumberHelper;
    private readonly persionNumber = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    convertToPersian = (str: string ) => {
        for(let i=0; i<10; i++)
        {
            const strNumber: string = `${i}`;
            str = str?.replaceAll(strNumber, this.persionNumber[i]);
        }
        return str;
    };

    public static getInstance(): NumberHelper {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}