import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountUnitSelectionComponent } from './amount-unit-selection.component';
import { CustomRadioGroupComponent } from 'src/app/home/shared/components/custom-radio-group/custom-radio-group.component';
import {
    MatRadioButton,
    MatRadioGroup,
    MatRipple
} from '@angular/material';
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
                MatRadioButton,
                MatRadioGroup,
                MatRipple
            ],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
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
