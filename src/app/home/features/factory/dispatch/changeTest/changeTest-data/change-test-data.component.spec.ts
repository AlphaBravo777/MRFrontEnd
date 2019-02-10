import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTestDataComponent } from './change-test-data.component';

describe('ChangeTestDataComponent', () => {
  let component: ChangeTestDataComponent;
  let fixture: ComponentFixture<ChangeTestDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTestDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
