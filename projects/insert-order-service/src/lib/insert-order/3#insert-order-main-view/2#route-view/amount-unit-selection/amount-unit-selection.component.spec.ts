import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountUnitSelectionComponent } from './amount-unit-selection.component';
import { CustomRadioGroupComponent } from 'src/app/home/shared/components/custom-radio-group/custom-radio-group.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AmountUnitSelectionComponent', () => {
    let component: AmountUnitSelectionComponent;
    let fixture: ComponentFixture<AmountUnitSelectionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AmountUnitSelectionComponent,
                CustomRadioGroupComponent,
            ],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                MatRadioModule,
                MatRippleModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AmountUnitSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
