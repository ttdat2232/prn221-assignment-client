import { Component, Input } from '@angular/core';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-infor',
  templateUrl: './car-infor.component.html',
  styleUrls: ['./car-infor.component.scss']
})
export class CarInforComponent {
  @Input()
  car: Car | any;
  isSelected: boolean = false;
  ngOnInit() {
    var selectedCars = localStorage.getItem("selected-car");
    if(selectedCars && !this.isSelected && this.car) 
      this.isSelected = selectedCars.includes(this.car.carId);
  }
}
