export class CreateCar {
    setDoorNumber(doorNumber: number) {
        this.numberOfDoors = doorNumber;
    }
    constructor(
        public carName: string = "",
        public numberOfDoors: number = 0,
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