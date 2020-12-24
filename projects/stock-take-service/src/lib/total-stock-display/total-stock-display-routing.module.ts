import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalStockDisplayDataComponent } from './2#total-stock-display-data/total-stock-display-data.component';


const routes: Routes = [
    {
        path: '',
        component: TotalStockDisplayDataComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TotalStockDisplayRoutingModule { }
