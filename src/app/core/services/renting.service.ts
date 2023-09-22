import { Injectable } from '@angular/core';
import { AppConstant } from '../utilities/constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RentingDetail } from '../models/create.renting-details.model';
import { Observable } from 'rxjs';
import { RentingTransaction } from '../models/renting-transaction.model';
import { RentingTransactionQuery } from '../models/renting-transaction-query.model';

@Injectable({
  providedIn: 'root'
})
export class RentingService {
  rentingApiUrl: string = AppConstant.API_BASE_URL + "api/renting";

  constructor(private http: HttpClient) { }

  renting(rentingDetails: RentingDetail[]): Observable<any> {
    return this.http.post<any>(this.rentingApiUrl, rentingDetails);
  }

  getRentingTransaction(query: RentingTransactionQuery): Observable<RentingTransaction> {
    let queryParams: string = `?userId=${query.userId}&transactionId=${query.transactionId}`
    return this.http.get<RentingTransaction>(this.rentingApiUrl + queryParams);
  }

  getUserRentingsTransaction(userId: number): Observable<RentingTransaction[]> {
    return this.http.get<RentingTransaction[]>(`${this.rentingApiUrl}/${userId}`);
  }
}
