import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistAddCheckFormComponent } from './checklist-add-check-form.component';

describe('ChecklistAddCheckFormComponent', () => {
  let component: ChecklistAddCheckFormComponent;
  let fixture: ComponentFixture<ChecklistAddCheckFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistAddCheckFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistAddCheckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
