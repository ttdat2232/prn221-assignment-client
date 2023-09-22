import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './features/car/car.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { CarInforComponent } from './features/car/car-infor/car-infor.component';
import { NavbarComponent } from './core/layouts/navbar/navbar.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { AuthComponent } from './core/auth/auth.component';
import { CartComponent } from './features/cart/cart.component';
import { CartDetailComponent } from './features/cart/cart-detail/cart-detail.component';
import { TransactionDetailComponent } from './features/transaction-detail/transaction-detail.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AdminComponent } from './features/admin/admin.component';
import { CarTableComponent } from './features/admin/car-table/car-table.component';
import { CreateCarComponent } from './features/admin/create-car/create-car.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CarInforComponent,
    NavbarComponent,
    HeaderComponent,
    AuthComponent,
    CartComponent,
    CartDetailComponent,
    TransactionDetailComponent,
    UserProfileComponent,
    PageNotFoundComponent,
    AdminComponent,
    CarTableComponent,
    CreateCarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor ,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
