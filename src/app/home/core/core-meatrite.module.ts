import { NgModule } from '@angular/core';
import { MaterialConfigModule } from '../../material-config/material-config.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialConfigModule,
    ],
    declarations: [
    ],
    exports: [
    ],
})
export class CoreMeatriteModule { }
