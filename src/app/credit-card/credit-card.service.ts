import { Injectable } from '@angular/core';
import { CreditCard } from './credit-card'

@Injectable()
export class CreditCardService {

  constructor() { }

  simulatePeriod(initialBankAccountBalance: number, timeframe: number, daysPerMonth: number, pay: number,
  costs: number, useCreditCard: boolean, interestRate: number): Array<number> {
    // Simulates the given period.
    let costsPerDay: number = costs / daysPerMonth;
    let bankAccount: number = initialBankAccountBalance;
    interestRate /= 100;
    let bankAccountHistory: number[] = [];

    // Create a credit card if specified.
    let creditCard = null;
    if (useCreditCard) {
      creditCard = new CreditCard(daysPerMonth);
    }

    for (let month = 0; month < timeframe; month++) {
      // Earn interest on the current account balance.
      let interest = (interestRate / 12) * bankAccount;
      bankAccount += interest;
      // Get paid, assuming we get paid at the start of the month.
      bankAccount += pay;
      let dueDate = 0;
      if (creditCard != null) {
        // Determine which day of this month to pay the credit card balance.
        dueDate = creditCard.getDueDate();
      }
      for(let day = 0; day < daysPerMonth; day++) {
        // Pay bills etc.
        if (creditCard != null) {
          // Use the credit card.
          creditCard.makePurchases(costsPerDay);
        }
        else {
          // Pay straight from the bank account.
          bankAccount -= costsPerDay;
        }

        // Pay the credit card.
        if (creditCard != null && day == dueDate) {
          let balance = creditCard.getBalance();
          bankAccount -= balance;
          creditCard.payBalance();
        }

        //bankAccountHistory[month * daysPerMonth + daysPerMonth] = bankAccount;
        bankAccountHistory.push(bankAccount);
      }
    }

    if (creditCard != null) {
      // Make the final payment.
      let balance = creditCard.getBalance();
      bankAccount -= balance;
      creditCard.payBalance();
      bankAccountHistory.push(bankAccount);
    }
    else {
      // Make a corresponding entry, so the history lengths are equal (for plotting).
      bankAccountHistory.push(bankAccountHistory[bankAccountHistory.length - 1]);
    }

    return bankAccountHistory;
  }

  randomize(numSeries: number, numPoints: number, labels: string[], baseNum: number): Array<any> {
    let _lineChartData: Array<any> = new Array(numSeries);
    for (let i = 0; i < numSeries; i++) {
      _lineChartData[i] = { data: new Array(numPoints), label: labels[i] };
      for (let j = 0; j < numPoints; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1) + baseNum;
        //console.log(_lineChartData[i].data[j])
      }
    }
    return _lineChartData;
  }

  getRandomData(numSeries: number, numPoints: number, labels: string[], baseNum: number = 100): Array<any> {
    return this.randomize(numSeries, numPoints, labels, baseNum);
  }
}
