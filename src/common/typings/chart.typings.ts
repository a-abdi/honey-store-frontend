export interface ReportOrderDate {
    _id: {
        month: number,
        day: number,
        year: number
    },
    totalAmount: number,
    count: number
}

export interface ReportOrderDateData {
    data: ReportOrderDate[] | []
}

export interface ReportOrderstatus {
    _id: number,
    totalAmount: number,
    count: number
}

export interface ReportOrderStatusData {
    data: ReportOrderstatus[] | []
}
