import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificOrderDataComponent } from './view-specific-order-data.component';
import { IsDataAvailableComponent } from 'src/app/home/shared/components/is-data-available/is-data-available.component';
import { ViewSpecificOrderViewComponent } from '../3#view-specific-order-view/view-specific-order-view.component';
import { MainOutsideContainerComponent } from 'src/app/home/shared/components/main-outside-container/main-outside-container.component';
import { ExpandableDivComponent } from 'src/app/home/shared/components/expandable-div/expandable-div.component';
import { HeadingDropdownViewComponent } from '../3#view-specific-order-view/heading-dropdown-view/heading-dropdown-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepickerModule
} from '@angular/material';
import { FloatLabelInputBoxComponent } from 'src/app/home/shared/components/float-label-input-box/float-label-input-box.component';
import { MinimalisticButtonComponent } from 'src/app/home/shared/components/minimalistic-button/minimalistic-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ViewSpecificOrderDataComponent', () => {
    let component: ViewSpecificOrderDataComponent;
    let fixture: ComponentFixture<ViewSpecificOrderDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ViewSpecificOrderDataComponent,
                IsDataAvailableComponent,
                ViewSpecificOrderViewComponent,
                MainOutsideContainerComponent,
                ExpandableDivComponent,
                HeadingDropdownViewComponent,
                FloatLabelInputBoxComponent,
                MinimalisticButtonComponent
            ],
            imports: [
                ReactiveFormsModule,
                MatDatepickerModule,
                HttpClientTestingModule,
                ApolloTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewSpecificOrderDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
