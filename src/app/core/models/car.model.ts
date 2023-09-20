export class Car {
    constructor(
        public carId?: number,
        public carName?: string,
        public carDescription?: string,
        public numberOfDoors?: number,
        public seatingCapacity?: number,
        public fuelType?: string,
        public year?: number,
        public manufacturerId?: number,
        public supplierId?: number,
        public carStatus?: number,
        public carRentingPricePerDay?: number
    ) {}
}