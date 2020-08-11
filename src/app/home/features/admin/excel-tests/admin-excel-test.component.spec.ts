import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExcelTestComponent } from './admin-excel-test.component';

describe('AdminExcelTestComponent', () => {
  let component: AdminExcelTestComponent;
  let fixture: ComponentFixture<AdminExcelTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExcelTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExcelTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
