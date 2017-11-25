export class CreditCard {
  // https://www.nab.com.au/personal/learn/managing-your-debts/interest-free-periods

  private _balance = 0;

  // The amount that we've already returned, to be paid.
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
    let amountToPay = this._balance - this._amountOwing;
    this._amountOwing += amountToPay;
    return {amount: amountToPay, days: this.getDueDate()};
  }

  getBalance(): number {
    return this._balance;
  }

  payBalance() {
    // Pay the entire balance.
    this._balance = 0;
    this._amountOwing = 0;
  }

  payAmount(amount) {
    this._balance -= amount;
    this._amountOwing -= amount;
  }

  getDueDate(): number {
    return Math.max(this.interestFreePeriod - this.statementPeriod, 0);
  }
}
