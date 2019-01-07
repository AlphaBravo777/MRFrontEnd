import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './controls/form-input/form-input.component';
import { FormSelectComponent } from './controls/form-select/form-select.component';
import { FormButtonComponent } from './controls/form-button/form-button.component';
import { DynamicFieldDirective } from './dynamic-form-services/dynamic-field.directive';

@NgModule({
    declarations: [
        DynamicFormComponent,
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
        DynamicFieldDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        DynamicFormComponent,
    ],
    entryComponents: [
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
    ],
})
export class DynamicFormModule { }
