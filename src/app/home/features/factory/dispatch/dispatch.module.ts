import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchRoutingModule } from './dispatch-routing.module';
import { DispatchEntryComponent } from './$dispatch-entry/dispatch-entry.component';
import { DispatchMenuComponent } from './$dispatch-menu/dispatch-menu.component';
import { ChangeTestDataComponent } from './changeTest/changeTest-data/change-test-data.component';
import { ChangeTestView1Component } from './changeTest/changeTest-view1/change-test-view1.component';
import { ChangeTestView2Component } from './changeTest/changeTest-view2/change-test-view2.component';
import { ChangeTestView3Component } from './changeTest/changeTest-view3/change-test-view3.component';

@NgModule({
    declarations: [
        DispatchEntryComponent,
        DispatchMenuComponent,
        ChangeTestDataComponent,
        ChangeTestView1Component,
        ChangeTestView2Component,
        ChangeTestView3Component],
    imports: [
        CommonModule,
        DispatchRoutingModule
    ]
})
export class DispatchModule { }
