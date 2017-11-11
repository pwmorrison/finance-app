import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AlertModule } from 'ngx-bootstrap';

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
    AlertModule.forRoot()
  ],
  providers: [CreditCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
