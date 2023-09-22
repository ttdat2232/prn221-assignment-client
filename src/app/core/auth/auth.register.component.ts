import { Component, OnInit } from '@angular/core';
import { AuthenticateModel } from '../models/auth.model';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-auth-register',
    templateUrl: './auth.register.component.html',
})
export class AuthRegisterComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private localStorageService: LocalStorageService,
        private router: Router,
        private route: ActivatedRoute) { }
    title: string = 'Renting car';
    description: string = 'Fast and Easy';
    authForm: FormGroup | any;
    error: string = "";
    submitted: boolean = false;
    ngOnInit(): void {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(1)]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validator: this.checkIfMatchingPasswords('password', 'confirmPassword')
        });
    }
    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }

    handleSubmission() {
        let email: string = this.authForm.value.email;
        let password: string = this.authForm.value.password;
        this.authService.register(email, password)
            .subscribe({
                next: res => {
                    this.localStorageService.setItem("isAdmin", `${res.isAdmin}`);
                    this.localStorageService.setItem("customerId", `${res.customerId}`);
                    if (res.isAdmin) {
                        this.router.navigate(['admin'], { relativeTo: this.route })
                    } else {
                        this.router.navigate(['../home'], {
                            relativeTo: this.route
                        });
                    }
                },
                error: err => {
                    this.submitted = false;
                    this.error = err.error;
                },
            });
    }
}