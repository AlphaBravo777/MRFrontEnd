import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPnpCsvDataComponent } from './insert-pnp-csv-data.component';

describe('InsertPnpCsvDataComponent', () => {
  let component: InsertPnpCsvDataComponent;
  let fixture: ComponentFixture<InsertPnpCsvDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPnpCsvDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPnpCsvDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
