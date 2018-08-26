import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RawMaterialRoutingModule } from './raw-material-routing.module';
import { RawMaterialDataComponent } from './raw-material-data/raw-material-data.component';


@NgModule({
  imports: [
    CommonModule,
    RawMaterialRoutingModule
  ],
  declarations: [
  RawMaterialDataComponent]
})
export class RawMaterialModule { }
