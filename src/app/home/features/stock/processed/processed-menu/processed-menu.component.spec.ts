import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedMenuComponent } from './processed-menu.component';

describe('ProcessedMenuComponent', () => {
  let component: ProcessedMenuComponent;
  let fixture: ComponentFixture<ProcessedMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
