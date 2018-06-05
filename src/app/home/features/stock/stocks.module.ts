import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockTakingComponent } from './stock-taking.component';
import { StocksRoutingModule } from './stocks-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StocksRoutingModule
  ],
  declarations: [StockTakingComponent]
})
export class StocksModule { }
