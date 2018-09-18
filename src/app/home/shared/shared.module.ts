import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RainbowProgressBarComponent } from './components/rainbow-progress-bar/rainbow-progress-bar.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RainbowProgressBarComponent,
  ],
  exports: [
      RainbowProgressBarComponent,
  ]
})
export class SharedModule { }
