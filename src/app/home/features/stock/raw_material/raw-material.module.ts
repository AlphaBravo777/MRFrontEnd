import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { RawMaterialRoutingModule } from './raw-material-routing.module';
import { RawMaterialDataComponent } from './raw-material-data/raw-material-data.component';
import { MainRawMaterialComponent } from './main-raw-material.component';
import { RawMaterialViewComponent } from './raw-material-view/raw-material-view.component';
import { RawMaterialView1Component } from './raw-material-view/raw-material-view1/raw-material-view1.component';
import { RawMaterialView2Component } from './raw-material-view/raw-material-view2/raw-material-view2.component';

@NgModule({
  imports: [
    CommonModule,
    RawMaterialRoutingModule,
    SharedModule,
  ],
  declarations: [
    MainRawMaterialComponent,
    RawMaterialDataComponent,
    RawMaterialViewComponent,
    RawMaterialView1Component,
    RawMaterialView2Component]
})
export class RawMaterialModule { }
