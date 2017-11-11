import { Injectable } from '@angular/core';
import { CreditCard } from './credit-card'

@Injectable()
export class CreditCardService {

  constructor() { }

  simulatePeriod(initialBankAccountBalance: number, timeframe: number, daysPerMonth: number, pay: number,
  costs: number, creditCard: CreditCard, interestRate: number): Array<number> {
    // Simulates the given period.
    let costsPerDay: number = costs / daysPerMonth;
    let bankAccount: number = initialBankAccountBalance;
    //let bankAccountHistory: number[] = new Array(timeframe * daysPerMonth);
    let bankAccountHistory: number[] = [];

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

  // def simulate_period(
  //       initial_bank_account_balance, timeframe, days_per_month, pay, costs,
  //       credit_card, interest_rate):
  //   """
  //   Simulates the given period.
  //   """
  //   costs_per_day = costs / days_per_month
  //   bank_account = initial_bank_account_balance
  //   bank_account_history = []
  //   for month in range(timeframe):
  //       # Earn interest on the current account balance.
  //       interest = (interest_rate / 12) * bank_account
  //       bank_account += interest
  //       # Get paid, assuming we get paid at the start of the month.
  //       bank_account += pay
  //       if credit_card is not None:
  //           # Determine which day of this month to pay the credit card balance.
  //           due_date = credit_card.get_due_date()
  //       for day in range(days_per_month):
  //           # Pay bills etc.
  //           if credit_card is not None:
  //               # Use the credit card.
  //               credit_card.make_purchases(costs_per_day)
  //           else:
  //               # Pay straight from the bank account.
  //               bank_account -= costs_per_day
  //
  //           # Pay the credit card.
  //           if credit_card is not None and day == due_date:
  //               balance = credit_card.get_balance()
  //               bank_account -= balance
  //               credit_card.pay_balance()
  //
  //           bank_account_history.append(bank_account)
  //
  //   if credit_card is not None:
  //       # Make the final payment.
  //       balance = credit_card.get_balance()
  //       bank_account -= balance
  //       credit_card.pay_balance()
  //       bank_account_history.append(bank_account)
  //   else:
  //       # Make a corresponding entry, so the history lengths are equal
  //       # (for plotting).
  //       bank_account_history.append(bank_account_history[-1])
  //
  //   return bank_account_history

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
