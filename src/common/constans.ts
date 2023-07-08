export const REGEX_MONGO_DB_ID = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

export const SORT_PRODUCT = [
    {
        index: 1,
        text: "جدیدترین",
    },
    {
        index: 2,
        text: "ارزان ترین",
    },
    {
        index: 3,
        text: "گران ترین",
    },
    {
        index: 4,
        text: "محبوب ترین",
    },
    {
        index: 5,
        text: "بیشترین تخفیف",
    },
    {
        index: 7,
        text: "پرفروش ترین",
    },
];

export const ORDER_STATUS = [
    'در انتظار پرداخت',
    'پرداخت شده',
    'لغو شده',
    'فرستاده شده',
    'مرجوع شده',
    'تحویل داده شده',
];

export const PROPERTY_TYPES = [
    "file",
    "text",
    "number",
];
