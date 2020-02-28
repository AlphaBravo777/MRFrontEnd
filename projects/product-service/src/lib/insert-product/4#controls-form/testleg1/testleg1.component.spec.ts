import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testleg1Component } from './testleg1.component';

describe('Testleg1Component', () => {
  let component: Testleg1Component;
  let fixture: ComponentFixture<Testleg1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testleg1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testleg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
