import { Component } from '@angular/core';
import { HomeLoanDetails } from './home-loan-details';
import { HomeLoanService } from './home-loan/home-loan.service'

// TODO:
// Monthly / yearly fees (input)
// Show the
// Loan comparison
// Extra repayments per month
// Helpful comments (e.g. "You will save $X if you switch to P+I")
// "You will save $X, if you pay an extra $X per month."
// "You will pay off the loan in X years X months, if you pay an extra $X per month."

@Component({
  selector: 'home-loan-calc',
  templateUrl: './home-loan-calc.component.html'
})
export class HomeLoanCalcComponent {

  title = 'Home loan calculator';
  summary = 'A simple home loan simulator.';

  // lineChart
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Principal, $'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Month'
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

  public totalInterestPaid = null;
  public monthlyPaymentIO = undefined;
  public monthlyPaymentPI = null;

  public pageId = '/home-loan';

  // The details currently being displayed.
  homeLoanDetails: HomeLoanDetails;

  constructor(private homeLoanService: HomeLoanService) {
    // Create initial credit card details.
    this.homeLoanDetails = new HomeLoanDetails(
      470000,
      30,
      4.7,
      0,
      100000
    );
  }

  ngOnInit() {
    // this.randomize();
    this.createChartData();
  }

  public createChartData(): void {
    let details = this.homeLoanDetails;
    console.log(details);

    let homeLoanData = this.homeLoanService.simulatePeriod(
      details.initialAmount,
      details.period,
      details.interestRate,
      details.interestOnlyPeriod,
      details.offsetAmount
    );

    let monthlyPrincipal = homeLoanData.monthlyPrincipal;
    let monthlyInterestCharges = homeLoanData.monthlyInterestCharges;
    let monthlyPayments = homeLoanData.monthlyPayments;
    let monthlyPaymentIO = homeLoanData.monthlyPaymentIO;
    let monthlyPaymentPI = homeLoanData.monthlyPaymentPI;

    let numSeries = 1;
    let numPoints = monthlyPrincipal.length

    let _lineChartData: Array<any> = new Array(numSeries);
    _lineChartData[0] = { data: monthlyPrincipal, label: "Principal", fill: false };
    //_lineChartData[1] = { data: bankAccountHistoryCC, label: "With a credit card", fill:false };
    this.lineChartData = _lineChartData;

    // Update the x-axis labels.
    // Need to do it this way so they are updated.
    this.lineChartLabels.length = 0;
    for (let i = 0; i < numPoints; i++) {
      this.lineChartLabels.push(i);
    }

    // Determine the total interest paid.
    let totalInterestPaid = 0;
    for (let i = 0; i < monthlyInterestCharges.length; i++) {
      totalInterestPaid += monthlyInterestCharges[i];
    }

    this.totalInterestPaid = parseFloat(totalInterestPaid.toFixed(2));
    if (details.interestOnlyPeriod > 0) {
      this.monthlyPaymentIO = parseFloat(monthlyPaymentIO.toFixed(2));
    } else {
      this.monthlyPaymentIO = undefined;
    }
    this.monthlyPaymentPI = parseFloat(monthlyPaymentPI.toFixed(2));
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
    return JSON.stringify(this.homeLoanDetails);
  }
}
