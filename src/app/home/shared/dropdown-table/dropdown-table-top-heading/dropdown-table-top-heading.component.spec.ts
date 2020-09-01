import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTableTopHeadingComponent } from './dropdown-table-top-heading.component';

describe('DropdownTableTopHeadingComponent', () => {
  let component: DropdownTableTopHeadingComponent;
  let fixture: ComponentFixture<DropdownTableTopHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownTableTopHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTableTopHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
