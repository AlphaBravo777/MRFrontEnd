import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountMainViewComponent } from './add-account-main-view.component';

describe('AddAccountMainViewComponent', () => {
  let component: AddAccountMainViewComponent;
  let fixture: ComponentFixture<AddAccountMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
