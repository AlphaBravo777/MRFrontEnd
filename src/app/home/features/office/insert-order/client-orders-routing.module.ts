import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertOrderDataComponent } from './2#insert-order-data/insert-order-data.component';

const orderRoutes: Routes = [
    {
        path: '',  // orders
        component: InsertOrderDataComponent,
        children: [
            {
                path: 'add-order',
                component: InsertOrderDataComponent,
            },
            // {
            //     path: 'proc-stock-ranking',
            //     component: PsRankingDataComponent,
            //     // canActivate: [AuthGuard],
            // },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class ClientOrderRoutingModule { }
