import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  car: Car = new Car();
  @Input() rentingDetail: FormGroup = new FormGroup('');
  constructor(private carService: CarService){}

  ngOnInit(): void {
    let carId = this.rentingDetail.value.carId;
    this.carService.GetCarById(carId).subscribe(data => this.car = data);
  }

}
