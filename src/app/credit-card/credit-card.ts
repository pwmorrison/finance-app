export class CreditCard {
  // https://www.nab.com.au/personal/learn/managing-your-debts/interest-free-periods

  private _balance = 0;

  // The amount owing at the due date, from the previous month.
  private _amountOwing = 0;

  constructor(
    public readonly statementPeriod: number = 30,
    public readonly interestFreePeriod: number = 44
  ) { }

  makePurchases(amount, day) {
    this._balance += amount;
  }

  newMonth() {
    // Let the credit card know that its a new month.
    // The amount owing at the next due date is the current balance.
    this._amountOwing = this._balance;
  }

  getBalance(): number {
    return this._balance;
  }

  payBalance() {
    // Pay the entire balance.
    this._balance = 0;
    this._amountOwing = 0;
  }

  getAmountOwing(): number {
    return this._amountOwing;
  }

  payAmountOwing() {
    this._balance -= this._amountOwing;
    this._amountOwing = 0;
  }

  getDueDate(): number {
    return this.interestFreePeriod - this.statementPeriod;
  }
}
