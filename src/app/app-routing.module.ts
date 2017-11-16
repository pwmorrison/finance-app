import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreditCardSimComponent } from './credit-card-sim.component';
import { HomeLoanCalcComponent } from './home-loan-calc.component';

const routes: Routes = [
  { path: 'creditcard', component: CreditCardSimComponent },
  { path: 'homeloan', component: HomeLoanCalcComponent },
  { path: '', redirectTo: '/creditcard', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
