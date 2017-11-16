import { TestBed, inject } from '@angular/core/testing';

import { CreditCardService } from './credit-card.service';
import { CreditCard } from './credit-card';

describe('CreditCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditCardService]
    });
  });

  it('should be created', inject([CreditCardService], (service: CreditCardService) => {
    expect(service).toBeTruthy();
  }));

  it('should simulate credit card', inject([CreditCardService], (service: CreditCardService) => {
    expect(service).toBeTruthy();

    // PAUL: Compare these with the Python code.
    let initialBankAccountBalance = 10000;
    let timeframe = 12*1; // 36  // months
    let daysPerMonth = 30;  // simplifying assumption
    let pay = 5000;  // per month
    let costs = 4000;  // per month
    let interestRate = 4.0;  // 4%, currently common for home loans.

    // Without credit card.
    let bankAccountHistory = service.simulatePeriod(
        initialBankAccountBalance, timeframe, daysPerMonth, pay, costs, false, interestRate);
    //console.log(bankAccountHistory);
    //console.log(bankAccountHistory.length);

    // With credit card.
    bankAccountHistory = service.simulatePeriod(
        initialBankAccountBalance, timeframe, daysPerMonth, pay, costs, true, interestRate);
    // console.log(bankAccountHistory);
    // console.log(bankAccountHistory.length);
  }));

});
