import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService  {
  isLogined: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(){}
}
