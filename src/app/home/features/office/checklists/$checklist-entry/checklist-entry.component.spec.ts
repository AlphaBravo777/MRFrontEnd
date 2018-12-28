import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistEntryComponent } from './checklist-entry.component';

describe('ChecklistEntryComponent', () => {
  let component: ChecklistEntryComponent;
  let fixture: ComponentFixture<ChecklistEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
