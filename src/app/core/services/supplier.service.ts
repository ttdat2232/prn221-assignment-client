import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../utilities/constants';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier';
import { GetResult } from '../models/get-result.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  supplierApiUrl = AppConstant.API_BASE_URL + "api/supplier";
  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<GetResult<Supplier>> {
    return this.http.get<GetResult<Supplier>>(this.supplierApiUrl);
  }
}
