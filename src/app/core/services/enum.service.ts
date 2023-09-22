import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../utilities/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  enumApiUrl = AppConstant.API_BASE_URL + "api/enum";
  constructor(private http: HttpClient) { }
  
  getFuelTypes():Observable<string[]> {
    return this.http.get<string[]>(this.enumApiUrl + "/cars/fuelTypes");
  }

  getDoorNumber():Observable<string[]> {
    return this.http.get<string[]>(this.enumApiUrl + "/cars/doornumber");
  }
}
