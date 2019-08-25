import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewOrderDataComponent } from './2#view-order-data/view-order-data.component';

const viewOrdersRouting: Routes = [
    {
        path: '',  // view-orders
        component: ViewOrderDataComponent,
        children: [
            {
                path: 'add-order',
                component: ViewOrderDataComponent,
            },

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(viewOrdersRouting)],
  exports: [RouterModule]
})
export class ViewOrdersRoutingModule { }
