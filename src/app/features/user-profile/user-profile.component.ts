import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentingTransaction } from 'src/app/core/models/renting-transaction.model';
import { RentingService } from 'src/app/core/services/renting.service';
import { AppConstant } from 'src/app/core/utilities/constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  rentingTransactions: RentingTransaction[] = [];

  constructor(private rentingSerivce: RentingService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let customerId = Number.parseInt(localStorage.getItem('customerId') ?? '0');
    this.rentingSerivce.getUserRentingsTransaction(customerId)
      .subscribe({
        next: data => this.rentingTransactions = data,
        error: err => console.log(err)
      });
  }

  getTransaction(transactionId: number) {
    let customerId = Number.parseInt(localStorage.getItem('customerId') ?? '0');
    this.router.navigate(['../renting-transaction'], {
      relativeTo: this.route,
      queryParams: {
        userId: customerId,
        transactionId: transactionId,
      }
    })
  }
}
