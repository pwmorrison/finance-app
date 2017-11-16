import { TestBed, inject } from '@angular/core/testing';

import { HomeLoanService } from './home-loan.service';

describe('HomeLoanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeLoanService]
    });
  });

  it('should be created', inject([HomeLoanService], (service: HomeLoanService) => {
    expect(service).toBeTruthy();
  }));

  it('should calculate home loan', inject([HomeLoanService], (service: HomeLoanService) => {
    expect(service).toBeTruthy();

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
    let monthlyPrincipal = service.simulatePeriod(initialAmount, period, boqInterestRate, 0, offsetAmount);
    // console.log(monthlyPrincipal);
    // console.log(monthlyPrincipal.length);

    // The EP loan, P+I, with no offset account but paid off $90k.
    // Treat the amount paid off as offset, since the repayments will be based on
    // the initial principal
    monthlyPrincipal = service.simulatePeriod(initialAmount, period, ubankInterestRate, 0, amountPaidOff)
    console.log(monthlyPrincipal);
    console.log(monthlyPrincipal.length);
  }));
});
