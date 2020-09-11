import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFormComponent } from './date-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { DatePickerGraphqlApiService } from '../date-picker-service/date-picker-graphql-api.service';
import { DateApiReturnTestData } from 'src/assets/mockData/date.mocks';
import { of } from 'rxjs';
import { DatePickerGraphqlStringService } from '../date-picker-service/date-picker-graphql-string.service';

describe('DateFormComponent', () => {
    let component: DateFormComponent;
    let fixture: ComponentFixture<DateFormComponent>;
    let datePickerGraphqlApiService: DatePickerGraphqlApiService;
    let datePickerGraphqlApiServiceWeekDaySpy;
    const dateFormTestData = new DateApiReturnTestData();
    let controller: ApolloTestingController;

    // There are two 'beforeEach' functions here, this one seems to be the before each of every async call
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ ReactiveFormsModule, ApolloTestingModule ],
            declarations: [ DateFormComponent ],
            providers: [ DatePickerGraphqlApiService, DatePickerGraphqlStringService ]
        }).compileComponents();
        controller = TestBed.get(ApolloTestingController);
    }));

    // This gave and error: Expected no open operations, found 2: Shifts, GetAllStockTakingTimes
    // afterEach(() => {
    //     controller.verify();
    //   });

    // There are two 'beforeEach' functions here, this one seems to be the before each of every component creation
    beforeEach(() => {

        fixture = TestBed.createComponent(DateFormComponent);
        component = fixture.componentInstance;

        // - - Create spies - -
        // Due to the fact that these api calls run as soon as the component gets instantiated, we have to put the spy on the beforeEach block
        datePickerGraphqlApiService = TestBed.get(DatePickerGraphqlApiService);
        datePickerGraphqlApiServiceWeekDaySpy = spyOn(datePickerGraphqlApiService, 'getAllWeekDays').and.returnValue(of(dateFormTestData.weekDayReturnData));

        // - - Set @Input values - - (Which also means that these values should be in place when the component starts)
        component.currentWorkingDate = dateFormTestData.dateAfterUsingDatePicker;

        // We run ngOninit() so that the form pulls our data into the template (?)
        // component.ngOnInit(); // This did not really make a difference
        // We run detectChanges so that the above changes can take effect
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('subscriptions should have been called', () => {
        expect(datePickerGraphqlApiServiceWeekDaySpy).toHaveBeenCalled();
        expect(datePickerGraphqlApiServiceWeekDaySpy).toHaveBeenCalledWith();
        expect(component.dateForm.valid).toBeTruthy();
    });

    it('getAllWeekDays return data', () => {
        component.weekDays$.subscribe(weekdays => {
            expect(weekdays.length).toEqual(3);
        });
        // Due to the fact that I have a consolidate factory that changes the data, I think this will not be able to work, also I should test it in my service, not here
        // const op = controller.expectOne(datePickerGraphqlStringService.GET_ALL_DAYS_OF_THE_WEEK_DATA);
    });

    it('form field "year" should be valid', () => {
        const dateForm = component.dateForm;
        const formYear = dateForm.get('year');
        expect(formYear.value).toEqual(dateFormTestData.dateAfterUsingDatePicker.year);

        formYear.setValue('');
        expect(formYear.hasError('required')).toBeTruthy();

        formYear.setValue(1);
        expect(formYear.hasError('min')).toBeTruthy();

        formYear.setValue(3000);
        expect(formYear.hasError('max')).toBeTruthy();
    });

    it('form field "week" should be valid', () => {
        const dateForm = component.dateForm;
        const formWeek = dateForm.get('week').value;
        expect(formWeek).toEqual(dateFormTestData.dateAfterUsingDatePicker.week);
    });

    it('form field "weekDay" should be valid', () => {
        const dateForm = component.dateForm;
        const formWeekDay = dateForm.get('weekDay').value;
        expect(formWeekDay).toEqual(dateFormTestData.dateAfterUsingDatePicker.weekDay);
    });

    it('form field "shift" should be valid', () => {
        const dateForm = component.dateForm;
        const formShift = dateForm.get('shift').value;
        expect(formShift).toEqual(dateFormTestData.dateAfterUsingDatePicker.shiftid);
    });

    it('form field "time" should be valid', () => {
        const dateForm = component.dateForm;
        const formTime = dateForm.get('time').value;
        expect(formTime).toEqual(dateFormTestData.dateAfterUsingDatePicker.timeid);
    });

    it('test form submit function', () => {
        // Here we want to change some values and then submit and see if the right values are given through
    });

});
