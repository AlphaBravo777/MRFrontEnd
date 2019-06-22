import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPnpCsvViewComponent } from './insert-pnp-csv-view.component';

describe('InsertPnpCsvViewComponent', () => {
  let component: InsertPnpCsvViewComponent;
  let fixture: ComponentFixture<InsertPnpCsvViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPnpCsvViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPnpCsvViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
