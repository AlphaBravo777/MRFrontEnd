import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './#entry/entry.component';
import { MenuComponent } from './#menu/menu.component';
import { InsertPnpCsvDataComponent } from './insertPnPCSV/2#insert-pnp-csv-data/insert-pnp-csv-data.component';

const insertOrderServiceRoutes: Routes = [
    {
        path: '',
        redirectTo: 'entry/menu',
        pathMatch: 'full'
    },
    {
        path: 'entry',
        children: [
            {
                path: 'menu',
                component: MenuComponent
            },
            {
                path: 'insertPnPCSV',
                component: InsertPnpCsvDataComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(insertOrderServiceRoutes)],
    exports: [RouterModule],
    providers: []
})
export class InsertOrderServiceRoutingModule {}
export const InsertOrderServiceRoutingComponent = [
    EntryComponent,
    MenuComponent,
    InsertPnpCsvDataComponent
];
