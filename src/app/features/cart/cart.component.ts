import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateValicator } from './directives/validate-date.directive';
import { RentingService } from 'src/app/core/services/renting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/core/utilities/constants';
import { RentingTransactionQuery } from 'src/app/core/models/renting-transaction-query.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  rentingFormGroup: FormGroup = new FormGroup('');
  rentingDetails: FormGroup[] = [];
  errorMessage: string = "";
  constructor(
    private fb: FormBuilder, 
    private rentingService: RentingService, 
    private router: Router,
    private route: ActivatedRoute ){}

  ngOnInit(): void {
    this.rentingFormGroup = this.fb.group({
      rentingDetails: this.fb.array([]),
    });
    let carId: number[] = JSON.parse(localStorage.getItem('selected-car') ?? "[]");
    carId.forEach(e => {
      let fg = this.generateFormGroup(e);
      this.getRentingDetails().push(fg);
      this.rentingDetails.push(fg)
    });
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
    this.rentingService.renting(this.rentingFormGroup.value.rentingDetails)
    .subscribe({
      next: data => {
        // let url = AppConstant.API_BASE_URL + data.headers.get('location');
        let url = AppConstant.API_BASE_URL + data.location.substring(1);
        // let params = this.extractDataFromUrl(url); 
        this.router.navigate(['../renting-transaction'], {
          relativeTo: this.route,
          queryParams: {
            url: url
            // userId: params.userId,
            // transactionId: params.transactionId,
          }
        });
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error;
      },
    })
  }
  // extractDataFromUrl(url: string): RentingTransactionQuery{
  //   let params = url.substring(url.indexOf('?') + 1);
  //   let keyValue = params.split('&');
  //   let userId = Number.parseInt(keyValue[0].split('=')[1])
  //   let transactionId = Number.parseInt(keyValue[1].split('=')[1])
  //   return new RentingTransactionQuery(userId, transactionId);
  // }
}
