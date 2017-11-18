import { Injectable } from '@angular/core';
import { HomeLoan } from './home-loan'

@Injectable()
export class HomeLoanService {

  constructor() { }

  simulatePeriod(initialAmount: number, period: number, interestRate: number, interestOnlyPeriod: number = 0,
  offsetAmount: number = 0): Array<number> {
    interestRate /= 100;
    let homeLoan = new HomeLoan(initialAmount, period, interestRate, interestOnlyPeriod, offsetAmount);
    let homeLoanData = homeLoan.calculateMonthlyStats();
    return homeLoanData.monthlyPrincipal;
  }
}
