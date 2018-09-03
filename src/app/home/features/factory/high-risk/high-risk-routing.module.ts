import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HighRiskDataComponent } from './high-risk-data/high-risk-data.component';

const highRiskRoutes: Routes = [
    {
        path: '',
        component: HighRiskDataComponent,
    }
];
@NgModule({
  imports: [RouterModule.forChild(highRiskRoutes)],
  exports: [RouterModule]
})
export class HighRiskRoutingModule { }
