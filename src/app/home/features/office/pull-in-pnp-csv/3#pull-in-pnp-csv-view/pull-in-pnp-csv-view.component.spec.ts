import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullInPnpCsvViewComponent } from './pull-in-pnp-csv-view.component';

describe('PullInPnpCsvViewComponent', () => {
  let component: PullInPnpCsvViewComponent;
  let fixture: ComponentFixture<PullInPnpCsvViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullInPnpCsvViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullInPnpCsvViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
