import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testleg2Component } from './testleg2.component';

describe('Testleg2Component', () => {
  let component: Testleg2Component;
  let fixture: ComponentFixture<Testleg2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testleg2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testleg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
