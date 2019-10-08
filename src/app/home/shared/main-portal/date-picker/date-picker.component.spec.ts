import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { DateFormComponent } from './date-form/date-form.component';
import { BoxShadowContainerComponent } from '../../dropdown-table/box-shadow-container/box-shadow-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerComponent, DateFormComponent, BoxShadowContainerComponent ],
      imports: [ReactiveFormsModule, MaterialConfigModule, HttpClientTestingModule, ApolloTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
