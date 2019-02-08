import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTrucksView2Component } from './load-trucks-view2.component';

describe('LoadTrucksView2Component', () => {
  let component: LoadTrucksView2Component;
  let fixture: ComponentFixture<LoadTrucksView2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadTrucksView2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadTrucksView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
