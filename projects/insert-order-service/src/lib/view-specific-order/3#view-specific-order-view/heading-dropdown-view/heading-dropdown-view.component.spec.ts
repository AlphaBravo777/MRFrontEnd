import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingDropdownViewComponent } from './heading-dropdown-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FloatLabelInputBoxComponent } from 'src/app/home/shared/components/float-label-input-box/float-label-input-box.component';
import { MinimalisticButtonComponent } from 'src/app/home/shared/components/minimalistic-button/minimalistic-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeadingDropdownViewComponent', () => {
  let component: HeadingDropdownViewComponent;
  let fixture: ComponentFixture<HeadingDropdownViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadingDropdownViewComponent, FloatLabelInputBoxComponent, MinimalisticButtonComponent ],
      imports: [ ReactiveFormsModule, MatDatepickerModule, HttpClientTestingModule, ApolloTestingModule, MatNativeDateModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingDropdownViewComponent);
    component = fixture.componentInstance;
    component.currentRoute = {routeid: null, routeAmountPercentage: null, routeAmountTotal: null, routeName: null};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
