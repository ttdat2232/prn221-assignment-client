import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './features/car/car.component';
import { AuthComponent } from './core/auth/auth.component';
import { CartComponent } from './features/cart/cart.component';
import { TransactionDetailComponent } from './features/transaction-detail/transaction-detail.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AdminComponent } from './features/admin/admin.component';
import { CarTableComponent } from './features/admin/car-table/car-table.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'sign-in', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'home', component: CarComponent },
  { path: 'cart', component: CartComponent },
  { path: 'renting-transaction', component: TransactionDetailComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cars', component: CarTableComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
