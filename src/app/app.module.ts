import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { LineChartDemoComponent } from './line-chart-demo.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
