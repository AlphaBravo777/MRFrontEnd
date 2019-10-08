import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingDropdownViewComponent } from './heading-dropdown-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FloatLabelInputBoxComponent } from 'src/app/home/shared/components/float-label-input-box/float-label-input-box.component';
import { MinimalisticButtonComponent } from 'src/app/home/shared/components/minimalistic-button/minimalistic-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('HeadingDropdownViewComponent', () => {
  let component: HeadingDropdownViewComponent;
  let fixture: ComponentFixture<HeadingDropdownViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadingDropdownViewComponent, FloatLabelInputBoxComponent, MinimalisticButtonComponent ],
      imports: [ ReactiveFormsModule, MatDatepickerModule, HttpClientTestingModule, ApolloTestingModule, MatNativeDateModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingDropdownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
