import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WebsiteRoutingModule, WebsiteRoutingComponents } from './website-routing.module';

@NgModule({
  declarations: [
    WebsiteRoutingComponents,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule
  ]
})
export class WebsiteModule { }
