import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDateViewComponent } from './change-date-view.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ChangeDateViewComponent', () => {
    let component: ChangeDateViewComponent;
    let fixture: ComponentFixture<ChangeDateViewComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChangeDateViewComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule, ApolloTestingModule],
            providers: [
                { provide: FormBuilder, useValue: formBuilder }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeDateViewComponent);
        component = fixture.componentInstance;
        component.mainInsertForm = formBuilder.group({
            timeStampid: null
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
