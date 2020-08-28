import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './dynamic-form-controls/form-input/form-input.component';
import { FormButtonComponent } from './dynamic-form-controls/form-button/form-button.component';
import { FormSelectComponent } from './dynamic-form-controls/form-select/form-select.component';
import { DynamicFormComponent } from './dynamic-form-component/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-form-services/dynamic-field.directive';
import { MaterialConfigModule } from '../core-modules/material-config/material-config.module';
import { FormMultiSelectComponent } from './dynamic-form-controls/form-multi-select/form-multi-select.component';
import { FormFilterInputComponent } from './dynamic-form-controls/form-filter-input/form-filter-input.component';



@NgModule({
    declarations: [
        DynamicFormComponent,
        DynamicFieldDirective,
        FormInputComponent,
        FormButtonComponent,
        FormSelectComponent,
        FormMultiSelectComponent,
        FormFilterInputComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialConfigModule
    ],
    exports: [
        DynamicFormComponent
    ],
    entryComponents: [
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent
      ]
})
export class DynamicFormModule { }
