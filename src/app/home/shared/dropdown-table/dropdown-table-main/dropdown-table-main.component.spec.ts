import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTableMainComponent } from './dropdown-table-main.component';

describe('DropdownTableMainComponent', () => {
  let component: DropdownTableMainComponent;
  let fixture: ComponentFixture<DropdownTableMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownTableMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTableMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
