import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTestView2Component } from './change-test-view2.component';

describe('ChangeTestView2Component', () => {
  let component: ChangeTestView2Component;
  let fixture: ComponentFixture<ChangeTestView2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTestView2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTestView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
