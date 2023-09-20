import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogined: boolean = false;
  isAdmin: boolean = false;
  numberOfCars: number = 0;
  constructor(private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.localStorageService.localStorageService.subscribe(() => {
      this.isLogined = localStorage.getItem('customerId') != null;
      this.isAdmin = localStorage.getItem('isAdmin') == 'true';
      this.setNumberOfCars();
    });
  }
  
  logout() {
    this.localStorageService.clearStorage();
  }

  setNumberOfCars() {
    let selectedCarId: number[] = [];
    var selectedCar = localStorage.getItem('selected-car');
    if(selectedCar) {
      selectedCarId = JSON.parse(selectedCar);
      this.numberOfCars = selectedCarId.length;
    }
  }
}
