import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ChecklistsRoutingModule } from './checklists-routing.module';
import { ChecklistEntryComponent } from './$checklist-entry/checklist-entry.component';
import { ChecklistMenuComponent } from './$checklist-menu/checklist-menu.component';
import { ChecklistAddCheckDataComponent } from './checklist-add-check/checklist-add-check-data/checklist-add-check-data.component';
import { ChecklistAddCheckView1Component } from './checklist-add-check/checklist-add-check-view1/checklist-add-check-view1.component';
import { ChecklistAddCheckFormComponent } from './checklist-add-check/checklist-add-check-form/checklist-add-check-form.component';
import { ChecklistReadDataComponent } from './checklist-read/checklist-read-data/checklist-read-data.component';
import { ChecklistReadView1Component } from './checklist-read/checklist-read-view1/checklist-read-view1.component';

@NgModule({
    declarations: [
        ChecklistEntryComponent,
        ChecklistMenuComponent,
        ChecklistAddCheckDataComponent,
        ChecklistAddCheckView1Component,
        ChecklistAddCheckFormComponent,
        ChecklistReadDataComponent,
        ChecklistReadView1Component],
    imports: [
        CommonModule,
        ChecklistsRoutingModule,
        SharedComponentsModule,
        CustomMaterialModule,
        ReactiveFormsModule
    ]
})
export class ChecklistsModule { }
