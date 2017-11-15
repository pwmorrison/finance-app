import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { CreditCardSimComponent } from './credit-card-sim.component';
import { HomeLoanCalcComponent } from './home-loan-calc.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'credit', component: CreditCardSimComponent },
  { path: 'homeloan', component: HomeLoanCalcComponent },
  { path: '', redirectTo: '/credit', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
