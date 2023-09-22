import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCar } from 'src/app/core/models/create-car.model';
import { Manufacturer } from 'src/app/core/models/manufacturer';
import { Supplier } from 'src/app/core/models/supplier';
import { CarService } from 'src/app/core/services/car.service';
import { EnumService } from 'src/app/core/services/enum.service';
import { ManufacturerService } from 'src/app/core/services/manufacturer.service';
import { SupplierService } from 'src/app/core/services/supplier.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit, OnChanges {

  constructor(
    private enumService: EnumService,
    public supplierService: SupplierService,
    private manufacturerService: ManufacturerService,
    private carService: CarService,
    private fb: FormBuilder,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['car']) {
      this.car = changes['car'].currentValue;
      this.setUpForm();
    }
    if (changes['carId']) {
      this.carId = changes['carId'].currentValue;
    }
    if (changes['btnName']) {
      this.btnName = changes['btnName'].currentValue;
    }
  }
  @Output() isEventFinishSuccessFully: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isUpdated: EventEmitter<boolean> = new EventEmitter();
  @Input() car: CreateCar = new CreateCar();
  @Input() btnName: string = "";
  @Input() carId: number = 0;
  createForm: FormGroup = new FormGroup('');
  suppliers: Supplier[] = [];
  manufacturers: Manufacturer[] = [];
  fuelTypes: string[] = [];
  doorNumbers: string[] = [];
  errMsg: string = "";
  statuses = [
    { status: 'Available', value: 1 },
    { status: 'Unavailable', value: 0 },
  ]
  submitted: boolean = false;

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe(data => this.suppliers = data.values);
    this.manufacturerService.getManufacturers().subscribe(data => this.manufacturers = data.values);
    this.enumService.getDoorNumber().subscribe(data => this.doorNumbers = data);
    this.enumService.getFuelTypes().subscribe(data => this.fuelTypes = data);
    this.setUpForm();
  }

  setUpForm() {
    if(this.createForm)
      this.createForm = new FormGroup('');
    this.createForm = this.fb.group({
      carName: [this.car.carName, [Validators.required]],
      doorNumber: [this.car.numberOfDoors, [Validators.required]],
      fuelType: [this.car.fuelType, [Validators.required]],
      manufacturerId: [this.car.manufacturerId, [Validators.required]],
      supplierId: [this.car.supplierId, [Validators.required]],
      carDescription: [this.car.carDescription],
      seatingCapacity: [this.car.seatingCapacity],
      year: [this.car.year],
      carStatus: [this.car.carStatus],
      carRentingPricePerDay: [this.car.carRentingPricePerDay, [Validators.min(0)]]
    });
  }

  handleSubmit() {
    if (!this.createForm.invalid) {
      this.submitted = true;
      let carName = this.createForm.value.carName;
      let carDescription = this.createForm.value.carDescription;
      let doorNumber = this.createForm.value.doorNumber == 'Two' ? 2 : this.createForm.value.doorNumber == 'Four' ? 4 : 0;
      let fuelType = this.createForm.value.fuelType;
      let supplierId = this.createForm.value.supplierId;
      let seatingCapacity = this.createForm.value.seatingCapacity;
      let manufacturerId = this.createForm.value.manufacturerId;
      let year = this.createForm.value.year;
      let carStatus = this.createForm.value.carStatus;
      let carRentingPricePerDay = this.createForm.value.carRentingPricePerDay;
      let submitCar = new CreateCar(carName, doorNumber, fuelType, manufacturerId, supplierId, carDescription, seatingCapacity, year, carStatus, carRentingPricePerDay);
      if (this.carId === 0)
        this.carService.createCar(submitCar)
          .subscribe({
            next: data => {
              this.isEventFinishSuccessFully.emit(true);
            },
            error: err => {
              this.handleError(err);
            }
          });
      if (this.carId > 0) {
        this.carService.updateCar(this.carId, submitCar).subscribe({
          next: data => {
            this.isUpdated.emit(true);
            alert('updated');
          },
          error: err => {
            this.handleError(err);
          }
        });
      }
    }
  }
  handleError(err: HttpErrorResponse) {
    this.errMsg = err.error;
    this.submitted = false;
  }
  setCar(car: CreateCar) {
    this.car = car;
  }

  setBtnName(name: string) {
    this.btnName = name;
  }
}
