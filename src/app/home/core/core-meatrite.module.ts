import { NgModule } from '@angular/core';
import { MaterialConfigModule } from '../../material-config/material-config.module';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialConfigModule,
    ],
    declarations: [
    DatePickerComponent,
    ],
    exports: [
        DatePickerComponent,
    ],
})
export class CoreMeatriteModule { }
