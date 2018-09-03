import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
} from '@angular/material';

const matModules = [
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule
];

@NgModule({
    imports: [matModules, CommonModule],
    exports: [matModules],
    declarations: []
})
export class MaterialConfigModule {}
