import { Injectable } from '@angular/core';

@Injectable()
export class CreditCardService {

  constructor() { }

  randomize(numSeries: number, numPoints: number, labels: string[], base_num: number): Array<any> {
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

  getRandomData(): Array<any> {
    return this.randomize(3, 10, ['A', 'B', 'C'], 200);
  }
}
