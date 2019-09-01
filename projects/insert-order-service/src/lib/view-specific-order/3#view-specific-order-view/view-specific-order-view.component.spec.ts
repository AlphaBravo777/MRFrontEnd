import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificOrderViewComponent } from './view-specific-order-view.component';

describe('ViewSpecificOrderViewComponent', () => {
  let component: ViewSpecificOrderViewComponent;
  let fixture: ComponentFixture<ViewSpecificOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpecificOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
