import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HppRoutingModule } from './hpp-routing.module';
import { HppMenuComponent } from './$hpp-menu/hpp-menu.component';
import { HppEntryComponent } from './$hpp-entry/hpp-entry.component';

@NgModule({
  declarations: [
    HppMenuComponent,
    HppEntryComponent
  ],
  imports: [
    CommonModule,
    HppRoutingModule
  ]
})
export class HppModule { }
