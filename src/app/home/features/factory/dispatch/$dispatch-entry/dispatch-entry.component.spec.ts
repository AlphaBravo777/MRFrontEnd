import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchEntryComponent } from './dispatch-entry.component';

describe('DispatchEntryComponent', () => {
  let component: DispatchEntryComponent;
  let fixture: ComponentFixture<DispatchEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
