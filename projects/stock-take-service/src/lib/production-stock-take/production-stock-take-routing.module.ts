import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionStockDataComponent } from './2#production-stock-data/production-stock-data.component';


const routes: Routes = [
    {
        path: '',
        component: ProductionStockDataComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionStockTakeRoutingModule { }
