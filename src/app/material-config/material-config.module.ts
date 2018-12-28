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
    MatExpansionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
} from '@angular/material';

const matModules = [
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
];

@NgModule({
    imports: [matModules, CommonModule],
    exports: [matModules],
    declarations: []
})
export class MaterialConfigModule {}
