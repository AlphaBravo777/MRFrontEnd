import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HighRiskDataComponent } from './high-risk-data/high-risk-data.component';
import { HighRiskPackinglistDataComponent } from './high-risk-packinglist/high-risk-packinglist-data/high-risk-packinglist-data.component';

const highRiskRoutes: Routes = [
    {
        path: '',
        component: HighRiskPackinglistDataComponent,
    }
];
@NgModule({
  imports: [RouterModule.forChild(highRiskRoutes)],
  exports: [RouterModule]
})
export class HighRiskRoutingModule { }
