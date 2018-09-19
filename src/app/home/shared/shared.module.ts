import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RainbowProgressBarComponent } from './components/rainbow-progress-bar/rainbow-progress-bar.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RainbowProgressBarComponent,
    UnderConstructionComponent,
  ],
  exports: [
      RainbowProgressBarComponent,
      UnderConstructionComponent,
  ]
})
export class SharedModule { }
