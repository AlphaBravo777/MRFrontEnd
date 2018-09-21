import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RainbowProgressBarComponent } from './components/rainbow-progress-bar/rainbow-progress-bar.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { CustomKeyboardComponent } from './components/custom-keyboard/custom-keyboard.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RainbowProgressBarComponent,
    UnderConstructionComponent,
    CustomKeyboardComponent,
  ],
  exports: [
      RainbowProgressBarComponent,
      UnderConstructionComponent,
      CustomKeyboardComponent,
  ]
})
export class SharedModule { }
