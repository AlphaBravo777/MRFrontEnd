import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistEntryComponent } from './$checklist-entry/checklist-entry.component';
import { ChecklistMenuComponent } from './$checklist-menu/checklist-menu.component';
import { ChecklistAddCheckDataComponent } from './checklist-add-check/checklist-add-check-data/checklist-add-check-data.component';
import { ChecklistReadDataComponent } from './checklist-read/checklist-read-data/checklist-read-data.component';


const checklistRoutes: Routes = [
    {
        path: '',  // checklists
        component: ChecklistEntryComponent,
        children: [
            {
                path: 'menu',
                component: ChecklistMenuComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'area-checks',
                component: ChecklistReadDataComponent
            },
            {
                path: 'new-check',
                component: ChecklistAddCheckDataComponent
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(checklistRoutes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
