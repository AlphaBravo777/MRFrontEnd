import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientDataComponent } from './add-client-data/add-client-data.component';

const addClientRoutes: Routes = [
    {
        path: '',  // add-client
        component: AddClientDataComponent,
        children: [
            // {
            //     path: 'office',
            //     component: AddClientDataComponent,
            //     // canActivate: [AuthGuard],
            // },
            {
                path: 'add-client',
                component: AddClientDataComponent,
            },
            // {
            //     path: 'proc-stock-ranking',
            //     component: PsRankingDataComponent,
            // },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(addClientRoutes)],
  exports: [RouterModule]
})
export class AddClientRoutingModule { }
