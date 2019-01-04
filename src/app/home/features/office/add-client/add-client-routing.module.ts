import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientDataComponent } from './add-client-data/add-client-data.component';

const addClientRoutes: Routes = [
    {
        path: '',  // clients
        component: AddClientDataComponent,
        children: [
            {
                path: 'add-client',
                component: AddClientDataComponent,
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
  imports: [RouterModule.forChild(addClientRoutes)],
  exports: [RouterModule]
})
export class AddClientRoutingModule { }
