export class RentingDetail {
    constructor(
        public rentingTransactionId: number, 
        public carId: number, 
        public startDate: Date,
        public endDate: Date,
        public number?: number) {}
}