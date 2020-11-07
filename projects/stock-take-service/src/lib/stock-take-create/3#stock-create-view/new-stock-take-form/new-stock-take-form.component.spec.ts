import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStockTakeFormComponent } from './new-stock-take-form.component';

describe('NewStockTakeFormComponent', () => {
  let component: NewStockTakeFormComponent;
  let fixture: ComponentFixture<NewStockTakeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStockTakeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStockTakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
