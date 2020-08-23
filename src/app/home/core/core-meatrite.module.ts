import { NgModule } from '@angular/core';
import { MaterialConfigModule } from '../../material-config/material-config.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialConfigModule,
    ],
    declarations: [
    LoadingScreenComponent],
    exports: [
    ],
})
export class CoreMeatriteModule { }
