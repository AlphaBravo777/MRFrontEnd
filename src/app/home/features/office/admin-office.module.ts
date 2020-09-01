import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOfficeRoutingModule } from './admin-office-routing.module';
import { OfficeEntryComponent } from './$office-entry/office-entry.component';
import { AdminOfficeMenuComponent } from './$office-menu/admin-office-menu.component';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
    declarations: [
        OfficeEntryComponent,
        AdminOfficeMenuComponent,
    ],
    imports: [
        CommonModule,
        AdminOfficeRoutingModule,
        NgxPermissionsModule.forChild(),
    ]
})
export class AdminOfficeModule { }
