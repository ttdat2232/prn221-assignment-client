import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService  {
  private localStorageSub: BehaviorSubject<string> = new BehaviorSubject('');
  public localStorageService = this.localStorageSub.asObservable();

  setItem(key: string, data: string) {
    localStorage.setItem(key, data);
    this.localStorageSub.next(data);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this.localStorageSub.next('local-storage-chage');
  }
  clearStorage() {
    localStorage.clear();
    this.localStorageSub.next('local-storage-chage');
  }
}
