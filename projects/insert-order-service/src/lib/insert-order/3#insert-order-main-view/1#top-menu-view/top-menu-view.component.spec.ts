import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuViewComponent } from './top-menu-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('TopMenuViewComponent', () => {
  let component: TopMenuViewComponent;
  let fixture: ComponentFixture<TopMenuViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMenuViewComponent ],
      imports: [ HttpClientTestingModule, ApolloTestingModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
});
