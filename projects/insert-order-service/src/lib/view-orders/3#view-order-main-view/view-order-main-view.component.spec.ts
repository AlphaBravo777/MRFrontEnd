import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderMainViewComponent } from './view-order-main-view.component';

describe('ViewOrderMainViewComponent', () => {
  let component: ViewOrderMainViewComponent;
  let fixture: ComponentFixture<ViewOrderMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
