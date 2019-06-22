import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PullInPnpCsvDataComponent } from './2#pull-in-pnp-csv-data/pull-in-pnp-csv-data.component';
import { RouterModule, Routes } from '@angular/router';
import { PullInPnpCsvViewComponent } from './3#pull-in-pnp-csv-view/pull-in-pnp-csv-view.component';

const pnpCSVRoutes: Routes = [
    {
        path: '',
        component: PullInPnpCsvDataComponent
    }
];

@NgModule({
    declarations: [PullInPnpCsvDataComponent, PullInPnpCsvViewComponent],
    imports: [CommonModule, RouterModule.forChild(pnpCSVRoutes)]
})
export class PullInPnpCsvModule {}
