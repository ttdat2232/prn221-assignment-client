import { Component } from '@angular/core';
import { Car } from '../../core/models/car.model';
import { CarService } from '../../core/services/car.service';
import { GetResult } from 'src/app/core/models/get-result.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {
  carResult: GetResult<Car> = new GetResult<Car>();
  pageSize: number = 4;
  pageIndex: number = 0;
  name: string = "";
  statuses: number[] = [1];
  constructor(private carService: CarService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getCars();
  }
  pageChange(page: number) {
    this.pageIndex = page - 1;
    this.getCars();
  }

  getCars() {
    this.carService.GetCars(this.pageIndex, this.pageSize, this.name, this.statuses)
      .subscribe(data => this.carResult = data);
  }
  timeOutId: any
  handleNameChange() {
    if(this.timeOutId)
      clearTimeout(this.timeOutId)
    this.timeOutId = setTimeout(() => {
        if(!this.name)
          this.name = "";
        this.getCars();
      }, 1000);
  }

  addToCart(event: number) {
    let selectedCarId: number[] = [];
    const selectedCar = localStorage.getItem("selected-car");
    if(selectedCar){
      selectedCarId = JSON.parse(selectedCar);
      selectedCarId.push(event);
    }
    else {
      selectedCarId.push(event)
    }
    this.localStorageService.setItem("selected-car", JSON.stringify(selectedCarId));
  }
}
