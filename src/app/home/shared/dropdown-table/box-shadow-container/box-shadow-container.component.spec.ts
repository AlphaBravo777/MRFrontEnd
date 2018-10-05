import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxShadowContainerComponent } from './box-shadow-container.component';

describe('BoxShadowContainerComponent', () => {
  let component: BoxShadowContainerComponent;
  let fixture: ComponentFixture<BoxShadowContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxShadowContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxShadowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
