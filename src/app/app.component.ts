import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'FUCarRentingSystemClient';
  
  constructor(private router: Router, private route: ActivatedRoute, private localStorageService: LocalStorageService){}

  ngOnInit(): void {
    this.localStorageService.localStorageService.subscribe(() => {
      if(Number.isNaN(localStorage.getItem("customerId")))
        this.router.navigate([''], {
          relativeTo: this.route,
        });
      });
  }

}
