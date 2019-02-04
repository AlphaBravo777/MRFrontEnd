import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryMenuComponent } from './factory-menu.component';

describe('FactoryMenuComponent', () => {
  let component: FactoryMenuComponent;
  let fixture: ComponentFixture<FactoryMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
