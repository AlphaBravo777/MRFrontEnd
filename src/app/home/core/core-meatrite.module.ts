import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
    DatePickerComponent,
    ],
    exports: [
        DatePickerComponent,
    ],
})
export class CoreMeatriteModule { }
