import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountViewComponent } from './account-view.component';
import { FloatLabelInputBoxComponent } from 'src/app/home/shared/components/float-label-input-box/float-label-input-box.component';
import { MinimalisticButtonComponent } from 'src/app/home/shared/components/minimalistic-button/minimalistic-button.component';
import { ReactiveFormsModule, FormBuilder, FormGroupDirective } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

const formBuilder: FormBuilder = new FormBuilder();

describe('AccountViewComponent', () => {
  let component: AccountViewComponent;
  let fixture: ComponentFixture<AccountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountViewComponent, FloatLabelInputBoxComponent, MinimalisticButtonComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule, ApolloTestingModule ],
      providers: [ FormGroupDirective, { provide: FormBuilder, useValue: formBuilder } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
});
