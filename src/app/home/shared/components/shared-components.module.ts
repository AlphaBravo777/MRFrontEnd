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
import { MinimalisticButtonComponent } from './minimalistic-button/minimalistic-button.component';
import { ColorChangeInputBoxComponent } from './color-change-input-box/color-change-input-box.component';
import { ExpandableDivComponent } from './expandable-div/expandable-div.component';
import { MainOutsideContainerComponent } from './main-outside-container/main-outside-container.component';
import { IsDataAvailableComponent } from './is-data-available/is-data-available.component';
import { FilterInputComponent } from './filter-input/filter-input.component';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialConfigModule,
    ],
    declarations: [
        RainbowProgressBarComponent,
        UnderConstructionComponent,
        CustomKeyboardComponent,
        CustomInputBoxComponent,
        FloatLabelInputBoxComponent,
        CustomTextareaComponent,
        CustomRadioGroupComponent,
        MinimalisticButtonComponent,
        ColorChangeInputBoxComponent,
        ExpandableDivComponent,
        MainOutsideContainerComponent,
        IsDataAvailableComponent,
        FilterInputComponent,
    ],
    exports: [
        RainbowProgressBarComponent,
        UnderConstructionComponent,
        CustomKeyboardComponent,
        CustomInputBoxComponent,
        FloatLabelInputBoxComponent,
        CustomTextareaComponent,
        CustomRadioGroupComponent,
        MinimalisticButtonComponent,
        ColorChangeInputBoxComponent,
        ExpandableDivComponent,
        MainOutsideContainerComponent,
        IsDataAvailableComponent,
        FilterInputComponent
    ]
})
export class SharedComponentsModule { }
