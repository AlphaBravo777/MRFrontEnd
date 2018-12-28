import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionFloorEntryComponent } from './production-floor-entry/production-floor-entry.component';
import { ProductionFloorMenuComponent } from './production-floor-menu/production-floor-menu.component';
// tslint:disable-next-line


const productionFloorRoutes: Routes = [
    {
        path: '',
        component: ProductionFloorEntryComponent,
        children: [
            {
                path: 'menu',
                component: ProductionFloorMenuComponent,
                // canActivate: [AuthGuard],
            },
            // {
            //     path: 'checklist',
            //     component: ProductionFloorChecklistDataComponent,
            //     // canActivate: [AuthGuard],
            // },
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(productionFloorRoutes)],
  exports: [RouterModule]
})
export class ProductionFloorRoutingModule { }
