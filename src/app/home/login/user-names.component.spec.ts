import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNamesComponent } from './user-names.component';

describe('UserNamesComponent', () => {
  let component: UserNamesComponent;
  let fixture: ComponentFixture<UserNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
