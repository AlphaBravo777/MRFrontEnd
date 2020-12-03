import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTakeCreateDataComponent } from './stock-take-create-data.component';

describe('StockTakeCreateDataComponent', () => {
  let component: StockTakeCreateDataComponent;
  let fixture: ComponentFixture<StockTakeCreateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTakeCreateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTakeCreateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
