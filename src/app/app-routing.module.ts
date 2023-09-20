import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './features/car/car.component';
import { AuthComponent } from './core/auth/auth.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'sign-in', component: AuthComponent},
  {path: 'home', component: CarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
