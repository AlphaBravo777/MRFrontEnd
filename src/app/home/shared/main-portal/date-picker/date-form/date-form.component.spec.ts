import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFormComponent } from './date-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { IDate, datePackage_factory } from '../date-picker-service/date-interface';
import { DatePickerGraphqlApiService } from '../date-picker-service/date-picker-graphql-api.service';
import { TestWeekDays } from '../date-picker-service/date.mocks';
import { of } from 'rxjs';

describe('DateFormComponent', () => {
    let component: DateFormComponent;
    let fixture: ComponentFixture<DateFormComponent>;
    let datePickerGraphqlApiService: DatePickerGraphqlApiService;
    let datePickerGraphqlApiServiceWeekDaySpy;
    const testWeekDays = new TestWeekDays();
    // let controller: ApolloTestingController;

    // There are two 'beforeEach' functions here, this one seems to be the before each of every async call
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ ReactiveFormsModule, ApolloTestingModule ],
            declarations: [ DateFormComponent ],
            providers: [ DatePickerGraphqlApiService ]
        }).compileComponents();
    }));

    // There are two 'beforeEach' functions here, this one seems to be the before each of every component creation
    beforeEach(() => {
        // Due to the fact that these api calls run as soon as the component gets instantiated, we have to put the spy on the beforeEach block
        fixture = TestBed.createComponent(DateFormComponent);
        component = fixture.componentInstance;
        datePickerGraphqlApiService = TestBed.get(DatePickerGraphqlApiService);
        datePickerGraphqlApiServiceWeekDaySpy = spyOn(datePickerGraphqlApiService, 'getAllWeekDays').and.returnValue(of(testWeekDays.weekDayReturnData));
        // Due to the fact that we get these values with an @Input, we have to provide them, and after that 'detectChanges' so that they can take effect
        const currentWorkingDate: IDate = datePackage_factory();
        currentWorkingDate.year = 2019;
        component.currentWorkingDate = currentWorkingDate;
        // We run detectChanges so that the above changes can take effect
        fixture.detectChanges();
        console.log('weekDays = ', component.weekDays);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('getAllWeekDays should have been called', () => {
        expect(datePickerGraphqlApiServiceWeekDaySpy).toHaveBeenCalled();
        expect(datePickerGraphqlApiServiceWeekDaySpy).toHaveBeenCalledWith();
        // expect(component.weekDays.length).toEqual(4);
    });
});
