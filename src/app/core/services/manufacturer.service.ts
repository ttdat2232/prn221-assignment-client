import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../utilities/constants';
import { Observable } from 'rxjs';
import { Manufacturer } from '../models/manufacturer';
import { GetResult } from '../models/get-result.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  manufacturerApiUrl = AppConstant.API_BASE_URL + "api/manufacturer";
  constructor(private http: HttpClient) { }

  getManufacturers(): Observable<GetResult<Manufacturer>> {
    return this.http.get<GetResult<Manufacturer>>(this.manufacturerApiUrl);
  }
}
