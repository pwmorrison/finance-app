import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AlertModule } from 'ngx-bootstrap';
import { DisqusModule } from "ngx-disqus";

import { AppComponent } from './app.component';
import { LineChartDemoComponent } from './line-chart-demo.component';

import { CreditCardService } from './credit-card/credit-card.service';

@NgModule({
  declarations: [
    AppComponent,
    LineChartDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    AlertModule.forRoot(),
    DisqusModule.forRoot('finance-app')
  ],
  providers: [CreditCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
