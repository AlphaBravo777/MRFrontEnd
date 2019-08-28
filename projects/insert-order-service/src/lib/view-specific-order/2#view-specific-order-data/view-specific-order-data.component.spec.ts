import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificOrderDataComponent } from './view-specific-order-data.component';

describe('ViewSpecificOrderDataComponent', () => {
  let component: ViewSpecificOrderDataComponent;
  let fixture: ComponentFixture<ViewSpecificOrderDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpecificOrderDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificOrderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
