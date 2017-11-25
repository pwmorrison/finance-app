import { Injectable } from '@angular/core';
import { CreditCard } from './credit-card'

@Injectable()
export class CreditCardService {

  constructor() { }

  simulatePeriod(initialBankAccountBalance: number, timeframe: number, daysPerMonth: number, pay: number,
  costs: number, useCreditCard: boolean, interestRate: number, interestFreePeriod: number) {
    // Simulates the given period.
    let costsPerDay: number = costs / daysPerMonth;
    let bankAccount: number = initialBankAccountBalance;
    interestRate /= 100;
    let bankAccountHistory: number[] = [];
    let creditCardHistory: number[] = [];

    // Create a credit card if specified.
    let creditCard = null;
    if (useCreditCard) {
      creditCard = new CreditCard(daysPerMonth, interestFreePeriod);
    }

    let pendingCCPayments = [];
    for (let month = 0; month < timeframe; month++) {
      // Get paid, assuming we get paid at the start of the month.
      bankAccount += pay;
      let dueDate = 0;
      if (creditCard != null) {
        let nextPayment = creditCard.newMonth();
        pendingCCPayments.push(nextPayment);
        // Determine which day of this month to pay the credit card balance.
        dueDate = creditCard.getDueDate();
      }
      for(let day = 0; day < daysPerMonth; day++) {
        // Earn interest on the current account balance.
        let interest = (interestRate / 365) * bankAccount;
        bankAccount += interest;

        // Pay bills etc.
        if (creditCard != null) {
          // Use the credit card.
          creditCard.makePurchases(costsPerDay, day);
        }
        else {
          // Pay straight from the bank account.
          bankAccount -= costsPerDay;
        }

        // Pay the credit card if required.
        if (creditCard != null) {
          // Pay each of the due credit card payments.
          for (let i = 0; i < pendingCCPayments.length; i++) {
            let pendingCCPayment = pendingCCPayments[i];
            if (pendingCCPayment.days == 0) {
              // This payment is due.
              let amountDue = pendingCCPayment.amount;
              bankAccount -= amountDue;
              creditCard.payAmount(amountDue);
              // pendingCCPayments.remove(pendingCCPayment);
              pendingCCPayments.splice(i, 1)
            } else {
              // We're 1 day closer to the due date.
              pendingCCPayment.days -= 1
            }
          }
        }

        bankAccountHistory.push(parseFloat(bankAccount.toFixed(2)));
        if (creditCard != null) {
          creditCardHistory.push(parseFloat(creditCard.getBalance().toFixed(2)));
        }
      }
    }

    if (creditCard != null) {
      // Make the final payment.
      let balance = creditCard.getBalance();
      bankAccount -= balance;
      // creditCard.payBalance();
      creditCard.payAmount(balance);
      bankAccountHistory.push(parseFloat(bankAccount.toFixed(2)));
      creditCardHistory.push(parseFloat(creditCard.getBalance().toFixed(2)));
    }
    else {
      // Make a corresponding entry, so the history lengths are equal (for plotting).
      bankAccountHistory.push(parseFloat(bankAccountHistory[bankAccountHistory.length - 1].toFixed(2)));
    }

    return {bankAccountHistory: bankAccountHistory, creditCardHistory: creditCardHistory};
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
