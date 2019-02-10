import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTestView3Component } from './change-test-view3.component';

describe('ChangeTestView3Component', () => {
  let component: ChangeTestView3Component;
  let fixture: ComponentFixture<ChangeTestView3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTestView3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTestView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
