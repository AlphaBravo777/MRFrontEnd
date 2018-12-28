import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistReadDataComponent } from './checklist-read-data.component';

describe('ChecklistReadDataComponent', () => {
  let component: ChecklistReadDataComponent;
  let fixture: ComponentFixture<ChecklistReadDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistReadDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistReadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
