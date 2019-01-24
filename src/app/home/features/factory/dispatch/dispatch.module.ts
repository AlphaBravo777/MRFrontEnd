import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchRoutingModule } from './dispatch-routing.module';
import { DispatchEntryComponent } from './$dispatch-entry/dispatch-entry.component';
import { DispatchMenuComponent } from './$dispatch-menu/dispatch-menu.component';

@NgModule({
  declarations: [DispatchEntryComponent, DispatchMenuComponent],
  imports: [
    CommonModule,
    DispatchRoutingModule
  ]
})
export class DispatchModule { }
