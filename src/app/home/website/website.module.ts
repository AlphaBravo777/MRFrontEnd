import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WebsiteNavComponent } from './website-nav/website-nav.component';
import { WebsiteRoutingModule, WebsiteRoutingComponents } from './website-routing.module';

@NgModule({
  declarations: [
    WebsiteNavComponent,
    WebsiteRoutingComponents,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule
  ]
})
export class WebsiteModule { }
