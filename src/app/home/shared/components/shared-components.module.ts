import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { RainbowProgressBarComponent } from './rainbow-progress-bar/rainbow-progress-bar.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { CustomKeyboardComponent } from './custom-keyboard/custom-keyboard.component';
import { CustomInputBoxComponent } from './custom-input-box/custom-input-box.component';
import { FloatLabelInputBoxComponent } from './float-label-input-box/float-label-input-box.component';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { CustomRadioGroupComponent } from './custom-radio-group/custom-radio-group.component';
import { MatRadioModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatRadioModule,
    ],
    declarations: [
        RainbowProgressBarComponent,
        UnderConstructionComponent,
        CustomKeyboardComponent,
        CustomInputBoxComponent,
        FloatLabelInputBoxComponent,
        CustomTextareaComponent,
        CustomRadioGroupComponent,
    ],
    exports: [
        RainbowProgressBarComponent,
        UnderConstructionComponent,
        CustomKeyboardComponent,
        CustomInputBoxComponent,
        FloatLabelInputBoxComponent,
        CustomTextareaComponent,
        CustomRadioGroupComponent
    ]
})
export class SharedComponentsModule { }