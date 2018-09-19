import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRawMaterialComponent } from './main-raw-material.component';
import { UnderConstructionComponent } from '../../../shared/components/under-construction/under-construction.component';
import { RawMaterialDataComponent } from './stock-view/raw-material-data/raw-material-data.component';

// stock-raw/stocks-raw-view'
const rawProdRoutes: Routes = [
    {
        path: '',
        // component: MainRawMaterialComponent,
        children: [
            {
                path: 'stocks-raw-view',
                component: RawMaterialDataComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'stocktake-raw',
                component: UnderConstructionComponent,
            },
            // {
            //     path: 'something',
            //     component: MainRawMaterialComponent,
            // },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(rawProdRoutes)],
  exports: [RouterModule]
})
export class RawMaterialRoutingModule { }

export const RawMaterialRoutingComponents = [MainRawMaterialComponent];
