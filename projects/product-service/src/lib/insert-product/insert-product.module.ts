import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';


@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        SharedComponentsModule,
        ReactiveFormsModule
    ]
})
export class InsertProductModule {}
