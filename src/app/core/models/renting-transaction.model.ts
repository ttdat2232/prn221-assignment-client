import { RentingDetail } from "./create.renting-details.model";

export class RentingTransaction {
    constructor(
        public rentingTransationId: number,
        public rentingDetails: RentingDetail[],
        public rentingDate?: Date,
        public totalPrice?:number
    ) {}
}