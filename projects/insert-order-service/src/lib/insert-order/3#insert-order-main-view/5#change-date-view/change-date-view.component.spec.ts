import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDateViewComponent } from './change-date-view.component';

describe('ChangeDateViewComponent', () => {
  let component: ChangeDateViewComponent;
  let fixture: ComponentFixture<ChangeDateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
