import { Component, Input } from '@angular/core';
import { Car } from 'src/app/core/models/car.model';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent {
  @Input() car: Car = new Car();
  
}
