import { Injectable } from '@angular/core';
import { AppConstant } from '../utilities/constants';
import { AuthenticateModel } from '../models/auth.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticateResponse } from '../models/auth.response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authApiUrl: string =  AppConstant.API_BASE_URL + "api/Authenticate/";
  constructor(private http: HttpClient) { }

  login(auth: AuthenticateModel): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(this.authApiUrl + "login", auth);
  }
}
