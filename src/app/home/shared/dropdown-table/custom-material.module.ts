import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownTableMainComponent } from './dropdown-table-main/dropdown-table-main.component';
import { DropdownTableSecondComponent } from './dropdown-table-second/dropdown-table-second.component';
import { DropdownTableHeadingsComponent } from './dropdown-table-headings/dropdown-table-headings.component';
import { DropdownTableTopHeadingComponent } from './dropdown-table-top-heading/dropdown-table-top-heading.component';
import { BoxShadowContainerComponent } from './box-shadow-container/box-shadow-container.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DropdownTableMainComponent,
        DropdownTableSecondComponent,
        DropdownTableHeadingsComponent,
        DropdownTableTopHeadingComponent,
        BoxShadowContainerComponent,
    ],
    exports: [
        DropdownTableMainComponent,
        DropdownTableSecondComponent,
        DropdownTableHeadingsComponent,
        DropdownTableTopHeadingComponent,
        BoxShadowContainerComponent,
    ]
})
export class CustomMaterialModule { }
