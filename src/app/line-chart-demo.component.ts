import { Component } from '@angular/core';
import { CreditCardDetails } from './credit-card-details';
import { CreditCardService } from './credit-card/credit-card.service'

@Component({
  selector: 'line-chart-demo',
  templateUrl: './line-chart-demo.component.html'
})
export class LineChartDemoComponent {

  // lineChart
  public lineChartData: Array<any>;
  // public lineChartData: Array<any> = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  // ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public base_num: number = 100;

  // The details currently being displayed.
  creditCardDetails: CreditCardDetails;

  constructor(private creditCardService: CreditCardService) {
    // Create initial credit card details.
    this.creditCardDetails = new CreditCardDetails(10000, 12*1, 30, 5000, 4000, 0.04);
  }

  ngOnInit() {
    // this.randomize();
    this.createChartData();
  }

  public randomize(): void {
    this.lineChartData = this.creditCardService.getRandomData(3, 10, ['A', 'B', 'C'], this.base_num);
  }

  public createChartData(): void {
    let details = this.creditCardDetails;
    console.log(details);
    // Simulate this data.
    let bankAccountHistory = this.creditCardService.simulatePeriod(
      details.initial_bank_account_balance,
      details.timeframe,
      details.days_per_month,
      details.pay,
      details.costs,
      null, // credit card
      details.interest_rate
    );
    let numSeries = 1;
    let numPoints = bankAccountHistory.length
    let _lineChartData: Array<any> = new Array(numSeries);
    _lineChartData[0] = { data: bankAccountHistory, label: "Banks account balance" };

    this.lineChartData = _lineChartData;

    let _lineChartLabels: Array<any> = new Array(numPoints);
    for (let i = 0; i < numPoints; i++) {
      _lineChartLabels[i] = i;
    }
    this.lineChartLabels = _lineChartLabels;
  }

  public onSubmit(): void {
    this.createChartData();
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return "";//JSON.stringify(this.creditCardDetails); 
  }
}
