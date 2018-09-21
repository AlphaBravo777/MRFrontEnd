import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownTableMainComponent } from './dropdown-table-main/dropdown-table-main.component';
import { DropdownTableSecondComponent } from './dropdown-table-second/dropdown-table-second.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DropdownTableMainComponent,
        DropdownTableSecondComponent,
    ],
    exports: [
        DropdownTableMainComponent,
        DropdownTableSecondComponent,
    ]
})
export class CustomMaterialModule { }
