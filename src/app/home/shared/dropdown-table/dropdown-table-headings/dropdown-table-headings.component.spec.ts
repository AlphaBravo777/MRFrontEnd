import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTableHeadingsComponent } from './dropdown-table-headings.component';

describe('DropdownTableHeadingsComponent', () => {
  let component: DropdownTableHeadingsComponent;
  let fixture: ComponentFixture<DropdownTableHeadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownTableHeadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTableHeadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
