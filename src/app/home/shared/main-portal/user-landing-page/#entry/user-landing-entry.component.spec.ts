import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLandingEntryComponent } from './user-landing-entry.component';

describe('UserLandingEntryComponent', () => {
  let component: UserLandingEntryComponent;
  let fixture: ComponentFixture<UserLandingEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLandingEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLandingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
