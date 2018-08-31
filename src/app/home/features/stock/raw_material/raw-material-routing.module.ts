import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRawMaterialComponent } from './main-raw-material.component';

const rawProdRoutes: Routes = [
    {
        path: '',
        component: MainRawMaterialComponent,
        // children: [
        //     {
        //         path: '',
        //         component: MainRawMaterialComponent,
        //         // canActivate: [AuthGuard],
        //     },
        //     {
        //         path: 'something',
        //         component: MainRawMaterialComponent,
        //     },
        //     {
        //         path: 'something',
        //         component: MainRawMaterialComponent,
        //     },
        // ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(rawProdRoutes)],
  exports: [RouterModule]
})
export class RawMaterialRoutingModule { }

export const RawMaterialRoutingComponents = [MainRawMaterialComponent];
