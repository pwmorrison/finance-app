import { Component } from '@angular/core';
import { CreditCardDetails } from './credit-card-details';
import { CreditCardService } from './credit-card/credit-card.service'

@Component({
  selector: 'credit-card-sim',
  templateUrl: './credit-card-sim.component.html'
})
export class CreditCardSimComponent {

  // lineChart
  public lineChartData: Array<any>;
  // public lineChartData: Array<any> = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  // ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Balance, $'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Day'
        }
      }]
    },
    elements: {
      line: {
          tension: 0, // disables bezier curves
      }
    },
    animation: {
      duration: 0, // general animation time
    },
    hover: {
      animationDuration: 0, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0 // animation duration after a resize
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: 'rgba(148,159,177,1)',//'#fff', // A white border looks bad with many points.
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: 'rgba(77,83,96,1)',//'#fff', // A white border looks bad with many points.
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

  // Temporary number for random calculations.
  public base_num: number = 100;

  public finalBalanceNoCC = null;
  public finalBalanceCC = null;

  public pageId = '/credit-card';

  // The details currently being displayed.
  creditCardDetails: CreditCardDetails;

  constructor(private creditCardService: CreditCardService) {
    // Create initial credit card details.
    this.creditCardDetails = new CreditCardDetails(10000, 12*1, 30, 5000, 4000, 4.0);
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

    // Simulate without a credit card.
    let bankAccountHistoryNoCC = this.creditCardService.simulatePeriod(
      details.initial_bank_account_balance,
      details.timeframe,
      details.days_per_month,
      details.pay,
      details.costs,
      false, // credit card
      details.interest_rate
    );

    // Simulate with a credit card.
    let bankAccountHistoryCC = this.creditCardService.simulatePeriod(
      details.initial_bank_account_balance,
      details.timeframe,
      details.days_per_month,
      details.pay,
      details.costs,
      true, // credit card
      details.interest_rate
    );

    let numSeries = 2;
    let numPoints = bankAccountHistoryNoCC.length

    let _lineChartData: Array<any> = new Array(numSeries);
    _lineChartData[0] = { data: bankAccountHistoryNoCC, label: "Without a credit card", fill: false };
    _lineChartData[1] = { data: bankAccountHistoryCC, label: "With a credit card", fill:false };

    this.lineChartData = _lineChartData;

    // Update the x-axis labels.
    // Need to do it this way so they are updated.
    this.lineChartLabels.length = 0;
    for (let i = 0; i < numPoints; i++) {
      this.lineChartLabels.push(i);
    }

    this.finalBalanceNoCC = bankAccountHistoryNoCC[bankAccountHistoryNoCC.length - 1];
    this.finalBalanceCC = bankAccountHistoryCC[bankAccountHistoryCC.length - 1];
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

  get diagnostic() {
    return "";//JSON.stringify(this.creditCardDetails);
  }
}
