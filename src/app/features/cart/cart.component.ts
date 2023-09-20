import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  cars: Car[] = [];

  constructor(private carService: CarService){}

  ngOnInit(): void {
    let carId: number[] = JSON.parse(localStorage.getItem('selected-car') ?? "[]");
    carId.forEach(element => {
      this.carService.GetCarById(element)
        .subscribe({
          next: data => this.cars.push(data),
          error: err => console.log(err),
        });
    });
  }

}
