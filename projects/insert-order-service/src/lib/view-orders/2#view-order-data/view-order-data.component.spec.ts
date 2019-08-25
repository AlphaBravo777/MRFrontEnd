import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderDataComponent } from './view-order-data.component';

describe('ViewOrderDataComponent', () => {
  let component: ViewOrderDataComponent;
  let fixture: ComponentFixture<ViewOrderDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
