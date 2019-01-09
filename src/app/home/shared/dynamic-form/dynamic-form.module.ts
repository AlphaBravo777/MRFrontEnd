import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './controls/form-input/form-input.component';
import { FormSelectComponent } from './controls/form-select/form-select.component';
import { FormButtonComponent } from './controls/form-button/form-button.component';
import { DynamicFieldDirective } from './dynamic-form-services/dynamic-field.directive';
import { FilterInputComponent } from './controls/filter-input/filter-input.component';
import { FormFilterInputComponent } from './controls/form-filter-input/form-filter-input.component';

@NgModule({
    declarations: [
        DynamicFormComponent,
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
        DynamicFieldDirective,
        FilterInputComponent,
        FormFilterInputComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        DynamicFormComponent,
    ],
    entryComponents: [
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
        FormFilterInputComponent,
    ],
})
export class DynamicFormModule { }
