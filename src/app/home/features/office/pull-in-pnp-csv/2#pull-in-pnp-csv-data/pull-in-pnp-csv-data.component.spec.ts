import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullInPnpCsvDataComponent } from './pull-in-pnp-csv-data.component';

describe('PullInPnpCsvDataComponent', () => {
  let component: PullInPnpCsvDataComponent;
  let fixture: ComponentFixture<PullInPnpCsvDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullInPnpCsvDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullInPnpCsvDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
