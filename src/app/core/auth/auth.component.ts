import { Component } from '@angular/core';
import { AuthenticateModel } from '../models/auth.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  // styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  title: string = 'Renting car';
  description: string = 'Fast and Easy';
  authForm: FormGroup | any;
  error: string = "";
  isSubmitting: boolean = false;
  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute){}
  ngOnInit() {
    if(localStorage.getItem("customerId"))
       this.router.navigate(['home']);
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  handleSubmission() {
    let email: string = this.authForm.value.email;
    let password: string = this.authForm.value.password;
    this.authService.login(new AuthenticateModel(email, password))
      .subscribe({
        next: res => {
          this.localStorageService.setItem("isAdmin", `${res.isAdmin}`);
          this.localStorageService.setItem("customerId", `${res.customerId}`);
          this.router.navigate(['home'], {
            relativeTo: this.route
          });
          this.isSubmitting = false;
        },
        error: err => {
          this.isSubmitting = false;
          this.error = err.error;
        },
      });
  }
  
}



