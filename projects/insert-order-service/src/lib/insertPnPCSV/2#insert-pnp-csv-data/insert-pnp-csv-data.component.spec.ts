import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InsertPnpCsvDataComponent } from './insert-pnp-csv-data.component';
import { InsertPnpCsvViewComponent } from '../3#insert-pnp-csv-view/insert-pnp-csv-view.component';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('InsertPnpCsvDataComponent', () => {
    let component: InsertPnpCsvDataComponent;
    let fixture: ComponentFixture<InsertPnpCsvDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CustomMaterialModule,
                HttpClientTestingModule,
                ApolloTestingModule
            ],
            declarations: [InsertPnpCsvDataComponent, InsertPnpCsvViewComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InsertPnpCsvDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
