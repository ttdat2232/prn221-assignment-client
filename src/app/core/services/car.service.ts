import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { GetResult } from 'src/app/core/models/get-result.model';
import { Car } from '../models/car.model';
import { AppConstant } from 'src/app/core/utilities/constants';
import { CarSearch } from '../models/car.search.model';
import { Observable } from 'rxjs'
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
}
