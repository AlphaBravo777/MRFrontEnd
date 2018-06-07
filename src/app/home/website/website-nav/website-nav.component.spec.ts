import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteNavComponent } from './website-nav.component';

describe('WebsiteNavComponent', () => {
  let component: WebsiteNavComponent;
  let fixture: ComponentFixture<WebsiteNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
