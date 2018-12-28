import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsRankingView1Component } from './ps-ranking-view1.component';

describe('PsRankingView1Component', () => {
  let component: PsRankingView1Component;
  let fixture: ComponentFixture<PsRankingView1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsRankingView1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsRankingView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
