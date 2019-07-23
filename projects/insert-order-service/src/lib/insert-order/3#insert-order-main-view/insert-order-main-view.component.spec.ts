import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOrderMainViewComponent } from './insert-order-main-view.component';

describe('InsertOrderMainViewComponent', () => {
  let component: InsertOrderMainViewComponent;
  let fixture: ComponentFixture<InsertOrderMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertOrderMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertOrderMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
