import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderMainViewComponent } from './view-order-main-view.component';
import { MinimalisticButtonComponent } from 'src/app/home/shared/components/minimalistic-button/minimalistic-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IDate, datePackage_factory } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

describe('ViewOrderMainViewComponent', () => {
  let component: ViewOrderMainViewComponent;
  let fixture: ComponentFixture<ViewOrderMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderMainViewComponent, MinimalisticButtonComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderMainViewComponent);
    component = fixture.componentInstance;
    const currentDisplayingDate: IDate = datePackage_factory();
    component.currentDisplayingDate = currentDisplayingDate;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
