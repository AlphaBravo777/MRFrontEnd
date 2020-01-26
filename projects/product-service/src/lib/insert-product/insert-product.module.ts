import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
// import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { TestFormComponent } from './4#controls-form/test-form/test-form.component';
import { NgStackFormsModule } from '@ng-stack/forms';


@NgModule({
    declarations: [

    TestFormComponent],
    imports: [
        CommonModule,
        CustomMaterialModule,
        SharedComponentsModule,
        NgStackFormsModule,
    ]
})
export class InsertProductModule {}
