import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './features/car/car.component';
import { AuthComponent } from './core/auth/auth.component';
import { CartComponent } from './features/cart/cart.component';
import { TransactionDetailComponent } from './features/transaction-detail/transaction-detail.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'sign-in', component: AuthComponent},
  {path: 'home', component: CarComponent},
  {path: 'cart', component: CartComponent},
  {path: 'renting-transaction', component: TransactionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
