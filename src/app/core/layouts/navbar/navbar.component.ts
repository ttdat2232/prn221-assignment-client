import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private localStorageService: LocalStorageService){}

  ngOnInit(): void {
    this.localStorageService.isLogined.subscribe(data => this.isLogin = data);
  }
}
