import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTestView1Component } from './change-test-view1.component';

describe('ChangeTestView1Component', () => {
  let component: ChangeTestView1Component;
  let fixture: ComponentFixture<ChangeTestView1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTestView1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTestView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
