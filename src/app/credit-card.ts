export class CreditCard {
  // https://www.nab.com.au/personal/learn/managing-your-debts/interest-free-periods

  private _balance = 0;

  constructor(
    public readonly statementPeriod: number = 30,
    public readonly interestFreePeriod: number = 44,
  ) { }

  makePurchases(amount) {
    this._balance += amount;
  }

  getBalance(): number {
    return this._balance;
  }

  payBalance() {
    this._balance = 0;
  }

  getDueDate(): number {
    return this.interestFreePeriod - this.statementPeriod;
  }
}
