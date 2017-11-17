import { Component } from '@angular/core';
import { HomeLoanDetails } from './home-loan-details';
import { HomeLoanService } from './home-loan/home-loan.service'

@Component({
  selector: 'home-loan-calc',
  templateUrl: './home-loan-calc.component.html'
})
export class HomeLoanCalcComponent {

  title = 'Home loan calculator';

  // lineChart
  public lineChartData: Array<any>;
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

  public pageId = '/home-loan';

  // The details currently being displayed.
  homeLoanDetails: HomeLoanDetails;

  constructor(private homeLoanService: HomeLoanService) {
    // Create initial credit card details.
    this.homeLoanDetails = new HomeLoanDetails(10000, 12*1, 30, 5000, 4000, 4.0);
  }

  ngOnInit() {
    // this.randomize();
    this.createChartData();
  }

  public createChartData(): void {
    let details = this.homeLoanDetails;
    console.log(details);

    // PAUL: Compare these with the Python code.
    // EP loan.
    let initialAmount = 470000;
    let period = 30;
    // BOQ
    let offsetAmount = 100000;
    let boqInterestRate = 0.041;
    // UBank
    let amountPaidOff = 90000; // Leaving 10k in bank.
    let ubankInterestRate = 0.037;

    // The EP loan, P+I, with a $100,000 offset account.
    let monthlyPrincipal = this.homeLoanService.simulatePeriod(initialAmount, period, boqInterestRate, 0, offsetAmount);
    // console.log(monthlyPrincipal);
    // console.log(monthlyPrincipal.length);

    // The EP loan, P+I, with no offset account but paid off $90k.
    // Treat the amount paid off as offset, since the repayments will be based on
    // the initial principal
    monthlyPrincipal = this.homeLoanService.simulatePeriod(initialAmount, period, ubankInterestRate, 0, amountPaidOff)
    console.log(monthlyPrincipal);
    console.log(monthlyPrincipal.length);

    let numSeries = 1;
    let numPoints = monthlyPrincipal.length

    let _lineChartData: Array<any> = new Array(numSeries);
    _lineChartData[0] = { data: monthlyPrincipal, label: "Without a credit card", fill: false };
    //_lineChartData[1] = { data: bankAccountHistoryCC, label: "With a credit card", fill:false };

    this.lineChartData = _lineChartData;

    // Update the x-axis labels.
    // Need to do it this way so they are updated.
    this.lineChartLabels.length = 0;
    for (let i = 0; i < numPoints; i++) {
      this.lineChartLabels.push(i);
    }

    this.finalBalanceNoCC = 0;//bankAccountHistoryNoCC[bankAccountHistoryNoCC.length - 1];
    this.finalBalanceCC = 0;//bankAccountHistoryCC[bankAccountHistoryCC.length - 1];
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
