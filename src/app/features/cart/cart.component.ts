import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateValicator } from './directives/validate-date.directive';
import { RentingService } from 'src/app/core/services/renting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/core/utilities/constants';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { RentingTransactionQuery } from 'src/app/core/models/renting-transaction-query.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  rentingFormGroup: FormGroup = new FormGroup('');
  rentingDetails: FormGroup[] = [];
  errorMessage: string = "";
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private rentingService: RentingService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.localStorage.localStorageService
      .subscribe({
        next: () => {
          let carId: number[] = JSON.parse(localStorage.getItem('selected-car') ?? "[]");
          if (carId.length === 0)
            this.router.navigate(['../home'], { relativeTo: this.route });
          if (this.rentingFormGroup)
            this.rentingFormGroup = this.fb.group({
              rentingDetails: this.fb.array([]),
            });
          if(this.rentingDetails.length > 0)
            this.rentingDetails = [];  
          carId.forEach(e => {
            let fg = this.generateFormGroup(e);
            this.getRentingDetails().push(fg);
            this.rentingDetails.push(fg)
          });
        }
      })
  }
  getRentingDetails(): FormArray {
    return this.rentingFormGroup?.get('rentingDetails') as FormArray
  }
  generateFormGroup(carId: number): FormGroup {
    return new FormGroup({
      carId: new FormControl<number>(carId),
      startDate: new FormControl<Date>(new Date(), [DateValicator()]),
      endDate: new FormControl<Date>(new Date(), [DateValicator()])
    });
  }

  onSubmit() {
    this.submitted = true;
    this.rentingService.renting(this.rentingFormGroup.value.rentingDetails)
      .subscribe({
        next: data => {
          let url = AppConstant.API_BASE_URL + data.location.substring(1);
          this.localStorage.removeItem('selected-car');
          let params = RentingTransactionQuery.extractDataFromUrl(url); 
          this.router.navigate(['../renting-transaction'], {
            relativeTo: this.route,
            queryParams: {
              userId: params.userId,
              transactionId: params.transactionId,
            }
          });
        },
        error: err => {
          console.log(err);
          this.errorMessage = err.error;
        },
        complete: () => this.submitted = false
      })
  }
  
}
