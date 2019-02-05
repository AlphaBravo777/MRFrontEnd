import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTrucksLoadingComponent } from './load-trucks-loading.component';

describe('LoadTrucksLoadingComponent', () => {
  let component: LoadTrucksLoadingComponent;
  let fixture: ComponentFixture<LoadTrucksLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadTrucksLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadTrucksLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
