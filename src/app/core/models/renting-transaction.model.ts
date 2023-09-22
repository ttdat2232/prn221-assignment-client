import { RentingDetail } from "./renting-detail.model";

export class RentingTransaction {
    constructor(
        public rentingTransationId: number,
        public rentingDetails: RentingDetail[],
        public rentingDate?: Date,
        public totalPrice?:number
    ) {}
}