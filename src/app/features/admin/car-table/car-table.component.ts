import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/car.model';
import { GetResult } from 'src/app/core/models/get-result.model';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss']
})
export class CarTableComponent implements OnInit {

  carResult: GetResult<Car> = new GetResult<Car>();
  pageSize: number = 4;
  pageIndex: number = 0;
  name: string = "";
  statuses: number[] = [1];
  constructor(private carService: CarService){}

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
    
  }
}
