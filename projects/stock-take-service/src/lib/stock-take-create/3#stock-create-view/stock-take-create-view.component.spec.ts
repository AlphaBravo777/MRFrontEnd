import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTakeCreateViewComponent } from './stock-take-create-view.component';

describe('StockTakeCreateViewComponent', () => {
  let component: StockTakeCreateViewComponent;
  let fixture: ComponentFixture<StockTakeCreateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTakeCreateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTakeCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
