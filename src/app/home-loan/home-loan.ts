export class HomeLoan {
  // https://www.nab.com.au/personal/learn/managing-your-debts/interest-free-periods
  // https://www.moneysmart.gov.au/tools-and-resources/calculators-and-apps/interest-only-mortgage-calculator

  private monthlyPaymentIO;
  private monthlyPaymentPI;

  constructor(
    public readonly initialAmount: number,
    public readonly period: number,
    public readonly interestRate: number,
    public readonly interestOnlyPeriod: number = 0,
    public readonly offsetAmount: number = 0,
  ) {
    // Determine the monthly payments.
    this.monthlyPaymentIO = this.computeMonthlyPaymentIO(
        this.initialAmount, this.interestRate, this.offsetAmount);
    this.monthlyPaymentPI = this.computeMonthlyPaymentPI(
        this.initialAmount, this.period - this.interestOnlyPeriod, this.interestRate)
  }

  computeMonthlyPaymentIO(amount, interestRate, offsetAmount): number {
    // Assume we are paying the IO portion at the start of the loan, when we owe
    // the entire amount.
    let monthlyInterestRate = interestRate / 12;
    let M = (amount - offsetAmount) * monthlyInterestRate;
    return M
  }

  computeMonthlyPaymentPI(amount, periodYears, interestRate): number {
    // Compute the monthly payment during the P+I period.
    // https://www.wikihow.com/Calculate-Loan-Payments.
    let monthlyInterestRate = interestRate / 12;
    let numPayments = periodYears * 12;
    let M = amount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numPayments)));
    return M
  }

  computeMonthlyInterest(amount, interestRate, offsetAmount): number {
    // The interest charged for a given month, at the current amount.
    let monthlyInterestRate = interestRate / 12;
    let monthlyInterest = Math.max(amount - offsetAmount, 0) * monthlyInterestRate;
    return monthlyInterest;
  }

  calculateMonthlyStats() {
    let numIOPayments = this.interestOnlyPeriod * 12;
    let numPIPayments = (this.period - this.interestOnlyPeriod) * 12;
    let numPayments = this.period * 12;

    let principal = this.initialAmount;
    let monthlyInterestCharges: number[] = [];
    let monthlyPrincipal: number[] = [];
    let monthlyPayments: number[] = [];
    let amountOwing = this.monthlyPaymentIO * numIOPayments + this.monthlyPaymentPI * numPIPayments;
    for(let paymentNum = 0; paymentNum < numPayments; paymentNum++) {

      let interest = this.computeMonthlyInterest(principal, this.interestRate, this.offsetAmount);
      monthlyInterestCharges.push(interest);

      monthlyPrincipal.push(principal)
      let principalPaid;
      let payment;
      if (paymentNum < numIOPayments) {
        // We're in the IO period.
        principalPaid = 0;
        monthlyPayments.push(this.monthlyPaymentIO);
      }
      else {
        // We're paying principal.
        payment = this.monthlyPaymentPI;
        principalPaid = payment - interest;
        if ((principal - principalPaid) < 0 ) {
          // We're paying off the loan.
          payment -= (principalPaid - principal);
          principalPaid = principal;
        }
        monthlyPayments.push(payment);
      }

      principal -= principalPaid;

      if (paymentNum < numIOPayments) {
        amountOwing -= this.monthlyPaymentIO;
      }
      else {
        amountOwing -= payment;//self.monthly_payment_pi
      }

      if (principal <= 0) {
        break;
      }
    }

    return {
      'monthlyPrincipal': monthlyPrincipal,
      'monthlyInterestCharges': monthlyInterestCharges,
      'monthlyPayments': monthlyPayments
    };
  }
}
