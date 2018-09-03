import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskGroupsComponent } from './high-risk-groups.component';

describe('HighRiskGroupsComponent', () => {
  let component: HighRiskGroupsComponent;
  let fixture: ComponentFixture<HighRiskGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighRiskGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighRiskGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
