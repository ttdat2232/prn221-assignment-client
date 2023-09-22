import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { RentingService } from 'src/app/core/services/renting.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  start: Date = new Date();
  end: Date = new Date();
  data: any;
  years: any[] = [];
  labels: any[] = [];
  dataArray: any[] = [];
  selectedYear = 0;
  lineChartData?: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  lineChartLegend = false;
  constructor(private retingService: RentingService){}
  
  getData() {
    if(this.start < this.end) {
      this.retingService.getStatistic(this.start, this.end)
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
        this.setUpData();
        console.log(this.labels);
        console.log(this.dataArray);
        console.log(this.selectedYear);
        console.log(this.years);
      });
    }
  }

  setUpData() {
    for(const [key, value] of Object.entries(this.data[0].monthIncomes)) {
      this.labels.push(key);
      this.dataArray.push(value);
    }
    let years: any[] = [];
    this.data.forEach((element: any) => {
      years.push(element);
    });
    this.years = [...years];
    this.selectedYear = this.data[0].year;
    this.lineChartData =  {
      labels: this.labels,
      datasets: [{
        data: this.dataArray,
        tension: 0.5,
        borderColor: 'black'
      }]
    }
  }

  ngOnInit(): void {
  }

}
