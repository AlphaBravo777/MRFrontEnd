import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountDataComponent } from './add-account-data.component';

describe('AddAccountDataComponent', () => {
  let component: AddAccountDataComponent;
  let fixture: ComponentFixture<AddAccountDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
