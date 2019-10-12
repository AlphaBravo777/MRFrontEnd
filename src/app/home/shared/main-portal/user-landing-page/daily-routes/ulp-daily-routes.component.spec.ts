import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlpDailyRoutesComponent } from './ulp-daily-routes.component';
import { ExpandableDivComponent } from '../../../components/expandable-div/expandable-div.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UlpDailyRoutesComponent', () => {
  let component: UlpDailyRoutesComponent;
  let fixture: ComponentFixture<UlpDailyRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlpDailyRoutesComponent, ExpandableDivComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlpDailyRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
