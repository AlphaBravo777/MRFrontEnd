import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOrderView1Component } from './insert-order-view1.component';

describe('InsertOrderView1Component', () => {
  let component: InsertOrderView1Component;
  let fixture: ComponentFixture<InsertOrderView1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertOrderView1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertOrderView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
