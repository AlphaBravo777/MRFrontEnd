import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadWidgetComponent } from './load-widget.component';

describe('LoadWidgetComponent', () => {
  let component: LoadWidgetComponent;
  let fixture: ComponentFixture<LoadWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
