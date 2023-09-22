import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CreateCarComponent implements OnInit {

  constructor(
    private enumService: EnumService,
    public supplierService: SupplierService,
    private manufacturerService: ManufacturerService,
    private carService: CarService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  createForm: FormGroup = new FormGroup('');
  suppliers: Supplier[] = [];
  manufacturers: Manufacturer[] = [];
  fuelTypes: string[] = [];
  doorNumbers: string[] = [];
  submitted: boolean = false;

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe(data => this.suppliers = data.values);
    this.manufacturerService.getManufacturers().subscribe(data => this.manufacturers = data.values);
    this.enumService.getDoorNumber().subscribe(data => this.doorNumbers = data);
    this.enumService.getFuelTypes().subscribe(data => this.fuelTypes = data);
    this.createForm = this.fb.group({
      carName: ['', [Validators.required]],
      doorNumber: ['', [Validators.required]],
      fuelType: ['', [Validators.required]],
      manufacturerId: ['', [Validators.required]],
      supplierId: ['', [Validators.required]],
      carDescription: [''],
      seatingCapacity: [''],
      year: ['0'],
      carStatus: ['1'],
      carRentingPricePerDay: ['']
    })
  }
  handleSubmit() {
    console.log(this.createForm);
  }
}
