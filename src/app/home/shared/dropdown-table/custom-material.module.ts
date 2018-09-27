import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownTableMainComponent } from './dropdown-table-main/dropdown-table-main.component';
import { DropdownTableSecondComponent } from './dropdown-table-second/dropdown-table-second.component';
import { DropdownTableHeadingsComponent } from './dropdown-table-headings/dropdown-table-headings.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DropdownTableMainComponent,
        DropdownTableSecondComponent,
        DropdownTableHeadingsComponent,
    ],
    exports: [
        DropdownTableMainComponent,
        DropdownTableSecondComponent,
        DropdownTableHeadingsComponent,
    ]
})
export class CustomMaterialModule { }
