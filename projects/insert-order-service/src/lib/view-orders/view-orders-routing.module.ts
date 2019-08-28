import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewOrderDataComponent } from './2#view-order-data/view-order-data.component';
import { ViewSpecificOrderDataComponent } from '../view-specific-order/2#view-specific-order-data/view-specific-order-data.component';

const viewOrdersRouting: Routes = [
    {
        path: '',  // view-orders
        children: [
            {
                path: 'view-order',
                component: ViewOrderDataComponent,
            },
            {
                path: 'view-specific-order',
                component: ViewSpecificOrderDataComponent,
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(viewOrdersRouting)],
  exports: [RouterModule]
})
export class ViewOrdersRoutingModule { }
