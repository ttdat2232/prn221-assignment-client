import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CarInforComponent,
    NavbarComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor ,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
