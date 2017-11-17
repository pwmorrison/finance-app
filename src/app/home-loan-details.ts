export class HomeLoanDetails {

  constructor(
    public initial_bank_account_balance: number,
    public timeframe: number, // Months
    public days_per_month: number, // simplifying assumption
    public pay: number, // per month
    public costs: number, // per month
    public interest_rate: number // 4%, currently common for home loans.
  ) {  }

}
