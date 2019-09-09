import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ulpDailyRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('projects/insert-order-service/src/public_api').then(m => m.InsertOrderServiceModule),
    }
];

@NgModule({
  imports: [RouterModule.forChild(ulpDailyRoutes)],
  exports: [RouterModule]
})
export class UlpDailyRoutesRoutingModule { }
