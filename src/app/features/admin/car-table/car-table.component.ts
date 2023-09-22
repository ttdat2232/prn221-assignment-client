import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/core/models/car.model';
import { GetResult } from 'src/app/core/models/get-result.model';
import { CarService } from 'src/app/core/services/car.service';
import { CreateCarComponent } from '../create-car/create-car.component';
import { CreateCar } from 'src/app/core/models/create-car.model';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss']
})
export class CarTableComponent implements OnInit {

  @ViewChild('createUpdate') createUpdate?: CreateCarComponent;
  carResult: GetResult<Car> = new GetResult<Car>();
  createCar: CreateCar = new CreateCar();
  carId: number = 0;
  pageSize: number = 4;
  pageIndex: number = 0;
  name: string = "";
  statuses: number[] = [1, 0];
  formOpened = false;
  btnName = 'Create';
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.GetCars(this.pageIndex, this.pageSize, this.name, this.statuses)
      .subscribe(data => this.carResult = data);
  }

  pageChange(page: number) {
    this.pageIndex = page - 1;
    this.getCars();
  }

  timeOutId: any
  handleNameChange() {
    if (this.timeOutId)
      clearTimeout(this.timeOutId)
    this.timeOutId = setTimeout(() => {
      if (!this.name)
        this.name = "";
      this.getCars();
    }, 1000);
  }

  onClickPlusButton() {
    this.formOpened = true;
    this.carId = 0;
    this.btnName = 'Create';
    this.createCar = new CreateCar();
  }
  handleAfterFormSubmission(event: boolean) {
    if (event) {
      this.formOpened = !event;
      this.carService.GetCars(this.pageIndex, this.pageSize, this.name, this.statuses)
        .subscribe(data => this.carResult = data);
    }
  }

  onUpdate(car: Car) {
    if (!this.formOpened)
      this.formOpened = true;
    this.carId = car.carId ?? 0;
    this.btnName = 'Update';
    this.createCar = new CreateCar(
      car.carName,
      car.numberOfDoors,
      car.fuelType,
      car.manufacturerId,
      car.supplierId,
      car.carDescription,
      car.seatingCapacity,
      car.year,
      car.carStatus,
      car.carRentingPricePerDay
    );
  }

  handleAfterUpdated(event: boolean) {
    if (event) {
      this.formOpened = !event;
      this.carService.GetCars(this.pageIndex, this.pageSize, this.name, this.statuses)
        .subscribe(data => this.carResult = data);
    }
  }

  onDelete(car: Car) {
    this.carService.deleteCar(car.carId ?? 0)
      .subscribe({
        next: () => {
          alert('deleted')
          this.carService.GetCars(this.pageIndex, this.pageSize, this.name, this.statuses)
            .subscribe(data => this.carResult = data);
        }
      })
  }
}
