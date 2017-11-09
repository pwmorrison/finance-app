import { Component } from '@angular/core';
import { CreditCardDetails } from './credit-card-details';
import {CreditCardService } from './credit-card.service'

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
    this.creditCardDetails = new CreditCardDetails(10000, 12*10, 30, 5000, 4000, 0.04);
  }

  ngOnInit() {
    this.randomize();
  }

  public randomize_fn(numSeries: number, numPoints: number, labels: string[], base_num: number): Array<any> {
    let _lineChartData: Array<any> = new Array(numSeries);
    for (let i = 0; i < numSeries; i++) {
      _lineChartData[i] = { data: new Array(numPoints), label: labels[i] };
      for (let j = 0; j < numPoints; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1) + base_num;
        //console.log(_lineChartData[i].data[j])
      }
    }
    return _lineChartData;
  }

  public randomize(): void {
    //this.lineChartData = this.randomize_fn(this.lineChartData.length, this.lineChartData[0].data.length,
    //  ['A', 'B', 'C'], this.base_num);
    this.lineChartData = this.creditCardService.getRandomData();
  }

  // public randomize(): void {
  //   let _lineChartData: Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1) + this.base_num;
  //       console.log(_lineChartData[i].data[j])
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }

  public onSubmit(): void {
    console.log(this.creditCardDetails);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.creditCardDetails); }
}
