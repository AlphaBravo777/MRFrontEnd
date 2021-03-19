import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RawMaterialStockTakeDataComponent } from './2#raw-material-stock-take-data/raw-material-stock-take-data.component';


const routes: Routes = [
    {
        path: '',
        component: RawMaterialStockTakeDataComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RawMaterialStockTakeRoutingModule { }
