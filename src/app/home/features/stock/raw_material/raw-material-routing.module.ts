import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRawMaterialComponent } from './main-raw-material.component';
import { UserEntryComponent } from '../../../shared/user-entry.component';

const rawProdRoutes: Routes = [
    {
        path: 'user',
        component: UserEntryComponent,
        children: [
            {
                path: 'stock-taking-raw',
                component: MainRawMaterialComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'something',
                component: MainRawMaterialComponent,
            },
            {
                path: 'something',
                component: MainRawMaterialComponent,
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(rawProdRoutes)],
  exports: [RouterModule]
})
export class RawMaterialRoutingModule { }

// export const RawMaterialRoutingComponents = [EntryRawMaterialComponent];
