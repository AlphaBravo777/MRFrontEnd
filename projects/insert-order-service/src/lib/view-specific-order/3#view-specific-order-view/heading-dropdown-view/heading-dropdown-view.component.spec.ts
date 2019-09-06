import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingDropdownViewComponent } from './heading-dropdown-view.component';

describe('HeadingDropdownViewComponent', () => {
  let component: HeadingDropdownViewComponent;
  let fixture: ComponentFixture<HeadingDropdownViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadingDropdownViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingDropdownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
