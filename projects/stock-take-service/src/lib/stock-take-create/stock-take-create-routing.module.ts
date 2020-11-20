import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockTakeCreateDataComponent } from './2#stock-create-data/stock-take-create-data.component';


const routes: Routes = [
    {
        path: '',
        component: StockTakeCreateDataComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockTakeCreateRoutingModule { }
