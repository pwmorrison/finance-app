export class HomeLoanDetails {

  constructor(
    public initialAmount: number,
    public period: number, // Years
    public interestRate: number,
    public interestOnlyPeriod: number, // Years
    public offsetAmount: number // Years
  ) {  }

}
