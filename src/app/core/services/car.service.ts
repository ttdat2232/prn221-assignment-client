import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http'
import { GetResult } from 'src/app/core/models/get-result.model';
import { Car } from '../models/car.model';
import { AppConstant } from 'src/app/core/utilities/constants';
import { CarSearch } from '../models/car.search.model';
import { Observable } from 'rxjs'
import { CreateCar } from '../models/create-car.model';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CarService {

  carApiUrl: string = AppConstant.API_BASE_URL + "api/CarInformation";
  constructor(private http: HttpClient) {}

  GetCars(pageIndex: number = 0, pageSize: number = 4, name: string = "", statuses: number[] = []): Observable<GetResult<Car>> {
    let searchQuery = this.carApiUrl + new CarSearch(pageIndex, pageSize, name, statuses).toQueries();
    return this.http.get<GetResult<Car>>(searchQuery);
  }

  GetCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.carApiUrl}/${id}`);
  }

  createCar(car: CreateCar): Observable<any> {
    return this.http.post<any>(this.carApiUrl, car, {observe: 'response'});
  }
  updateCar(carId: number, car: CreateCar): Observable<any> {
    return this.http.put<any>(this.carApiUrl + `/${carId}`, car, {observe: 'response'});
  }

  deleteCar(carId: number): Observable<any> {
    return this.http.delete<any>(this.carApiUrl + `/${carId}`);
  }
}
