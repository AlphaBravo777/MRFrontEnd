import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTableSecondComponent } from './dropdown-table-second.component';

describe('DropdownTableSecondComponent', () => {
  let component: DropdownTableSecondComponent;
  let fixture: ComponentFixture<DropdownTableSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownTableSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTableSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
