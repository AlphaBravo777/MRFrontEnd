import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        MatSelectModule,
        MatButtonModule,
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
        MatRadioModule,
        MatRippleModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatCardModule,
        MatTooltipModule

    ],
    exports: [
        MatSelectModule,
        MatButtonModule,
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
        MatRadioModule,
        MatRippleModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatCardModule,
        MatTooltipModule

    ],
    declarations: []
})
export class MaterialConfigModule {}
