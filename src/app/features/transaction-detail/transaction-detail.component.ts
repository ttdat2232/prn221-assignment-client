import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentingTransactionQuery } from 'src/app/core/models/renting-transaction-query.model';
import { RentingTransaction } from 'src/app/core/models/renting-transaction.model';
import { RentingService } from 'src/app/core/services/renting.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  rentingTransaction: RentingTransaction = new RentingTransaction(0, []);
  constructor(private route: ActivatedRoute, private rentingService: RentingService) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        // let userId = params['userId'];
        // let transactionId = params['transactionId'];
        // let transactionQueries = new RentingTransactionQuery(userId, transactionId);
        let url = params['url'];
        this.rentingService.getRentingTransaction(url)
        .subscribe({
          next: data => this.rentingTransaction = data,
          error: err => console.log(err)
        });
      })
  }
  
  
}
