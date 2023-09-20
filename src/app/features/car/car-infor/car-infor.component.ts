import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../../../core/models/car.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-car-infor',
  templateUrl: './car-infor.component.html',
  styleUrls: ['./car-infor.component.scss']
})
export class CarInforComponent {
  @Input() car: Car | any;
  @Output() rentingEvent = new EventEmitter<number>();
  isSelected: boolean = false;
  constructor(private localStorageService: LocalStorageService){}
  ngOnInit() {
    this.localStorageService.localStorageService.subscribe(() => {
      var selectedCars = localStorage.getItem("selected-car");
      if(selectedCars && !this.isSelected && this.car) 
        this.isSelected = selectedCars.includes(this.car.carId);
    });
  }

  handleRenting() {
    if(this.car)
      this.rentingEvent.emit(this.car.carId);
  }
}
