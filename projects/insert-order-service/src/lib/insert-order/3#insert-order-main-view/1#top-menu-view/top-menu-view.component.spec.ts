import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuViewComponent } from './top-menu-view.component';

describe('TopMenuViewComponent', () => {
  let component: TopMenuViewComponent;
  let fixture: ComponentFixture<TopMenuViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMenuViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
