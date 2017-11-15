import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { AlertModule } from 'ngx-bootstrap';
import { DisqusModule } from "ngx-disqus";

import { AppComponent } from './app.component';

import { CreditCardService } from './credit-card/credit-card.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeLoanCalcComponent } from './home-loan-calc.component';
import { CreditCardSimComponent } from './credit-card-sim.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardSimComponent,
    HomeLoanCalcComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    //AlertModule.forRoot(),
    DisqusModule.forRoot('finance-app'),
    AppRoutingModule
  ],
  providers: [CreditCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
