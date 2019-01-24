import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTrucksDataComponent } from './load-trucks-data.component';

describe('LoadTrucksDataComponent', () => {
  let component: LoadTrucksDataComponent;
  let fixture: ComponentFixture<LoadTrucksDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadTrucksDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadTrucksDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
