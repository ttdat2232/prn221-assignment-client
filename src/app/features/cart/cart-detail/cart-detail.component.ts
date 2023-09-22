import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  car: Car = new Car();
  @Input() rentingDetail: FormGroup = new FormGroup('');
  constructor(private carService: CarService, private localStorageService: LocalStorageService){}

  ngOnInit(): void {
    let carId = this.rentingDetail.value.carId;
    this.carService.GetCarById(carId).subscribe(data => this.car = data);
  }
  removeCart() {
    let selectedCarIds = localStorage.getItem('selected-car') ?? "[]";
    let selectedCarArray: number[] = JSON.parse(selectedCarIds);
    let index = selectedCarArray.indexOf(this.car.carId ?? -1);
    if(index > -1) {
      selectedCarArray.splice(index, 1);
      this.localStorageService.setItem('selected-car', JSON.stringify(selectedCarArray));
    }
  }
}
