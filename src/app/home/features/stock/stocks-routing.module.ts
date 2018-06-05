import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { StockTakingComponent } from './stock-taking.component';
import { GetProductsComponent } from './processed/get-products/get-products.component';

const routes: Routes = [
  {
    path: 'stock-taking',
    component: StockTakingComponent
  },
  {
    path: 'processed',
    component: GetProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
