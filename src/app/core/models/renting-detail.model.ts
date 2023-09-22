export class RentingDetail {
    constructor(
        public rentingTransactionId: number, 
        public carId: number, 
        public startDate: Date,
        public endDate: Date,
        public price: number = 0,
        public carName: string = "") {}
}