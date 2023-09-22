export class CreateCar {
    constructor(
        public carName: string = "",
        public doorNumber: string = "",
        public fuelType: string = "",
        public manufacturerId: number = 0,
        public supplierId: number = 0,
        public carDescription?: string,
        public seatingCapacity?: number,
        public year?: number,
        public carStatus?: number,
        public carRentingPricePerDay?: number
    ){}
}