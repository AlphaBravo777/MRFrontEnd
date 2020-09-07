import { TestBed, inject } from '@angular/core/testing';

import { DatePickerService } from './date-picker.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { TestMockDateSuiteB, ITestInputs, TestStandardInputsSuite } from './date.mocks';

describe('DatePickerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule, ApolloTestingModule ],
            providers: [DatePickerService]
        });
    });

    describe('Overhead tests', () => {
        it('should be created', inject([DatePickerService], (service: DatePickerService) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('Convert long date to short date', () => {
        const mockTestSuiteB = new TestMockDateSuiteB;
        it(`for the correct input "${mockTestSuiteB.longDate1}", expected "${mockTestSuiteB.shortDate1}" to return`,
            inject([DatePickerService], (service: DatePickerService) => {
            expect(service.convertLongDateToShortDate(mockTestSuiteB.longDate1)).toEqual(mockTestSuiteB.shortDate1);
        }));

        const standardTestInputs: ITestInputs[] = [
            {testCase: 'empty string', actualValue: TestStandardInputsSuite.emptyInput, expectedValue: undefined},
            {testCase: 'string', actualValue: TestStandardInputsSuite.stringInput, expectedValue: undefined},
            {testCase: 'number', actualValue: TestStandardInputsSuite.numberInput, expectedValue: undefined},
        ];
        standardTestInputs.forEach(({testCase, actualValue, expectedValue}) => {
            it(`for the wrong input "${testCase}", expected "${expectedValue}" to return`, inject([DatePickerService], (service: DatePickerService) => {
                expect(service.convertLongDateToShortDate(actualValue)).toBe(expectedValue);
            }));
        });
    });

    describe('Return weekday name from long date', () => {
        const mockTestSuiteB = new TestMockDateSuiteB;
        it(`for the correct input "${mockTestSuiteB.longDate1}", expected "${mockTestSuiteB.weekDayString1}" to return`,
            inject([DatePickerService], (service: DatePickerService) => {
            expect(service.returnWeekdayNameFromLongDate(mockTestSuiteB.longDate1)).toEqual(mockTestSuiteB.weekDayString1);
        }));

        const standardTestInputs: ITestInputs[] = [
            {testCase: 'empty string', actualValue: TestStandardInputsSuite.emptyInput, expectedValue: undefined},
            {testCase: 'string', actualValue: TestStandardInputsSuite.stringInput, expectedValue: undefined},
            {testCase: 'number', actualValue: TestStandardInputsSuite.numberInput, expectedValue: undefined},
        ];
        standardTestInputs.forEach(({testCase, actualValue, expectedValue}) => {
            it(`for the wrong input "${testCase}", expected "${expectedValue}" to return`, inject([DatePickerService], (service: DatePickerService) => {
                expect(service.returnWeekdayNameFromLongDate(actualValue)).toBe(expectedValue);
            }));
        });
    });

    describe('Convert short date to long date', () => {
        const mockTestSuiteB = new TestMockDateSuiteB;
        it(`for the correct input "${mockTestSuiteB.shortDate1}", expected "${mockTestSuiteB.longDate1}" to return`,
            inject([DatePickerService], (service: DatePickerService) => {
            expect(service.convertShortDateToLongDate(mockTestSuiteB.shortDate1)).toEqual(mockTestSuiteB.longDate1);
        }));

        const standardTestInputs: ITestInputs[] = [
            {testCase: 'empty string', actualValue: TestStandardInputsSuite.emptyInput, expectedValue: undefined},
            {testCase: 'string', actualValue: TestStandardInputsSuite.stringInput, expectedValue: undefined},
            {testCase: 'number', actualValue: TestStandardInputsSuite.numberInput, expectedValue: undefined},
        ];
        standardTestInputs.forEach(({testCase, actualValue, expectedValue}) => {
            it(`for the wrong input "${testCase}", expected "${expectedValue}" to return`, inject([DatePickerService], (service: DatePickerService) => {
                expect(service.convertShortDateToLongDate(actualValue)).toBe(expectedValue);
            }));
        });
    });

    describe('Return week number from long date', () => {
        const mockTestSuiteB = new TestMockDateSuiteB;
        it(`for the correct input "${mockTestSuiteB.longDate1}", expected "${mockTestSuiteB.weekNumber1}" to return`,
            inject([DatePickerService], (service: DatePickerService) => {
            expect(service.returnWeekNumberFromLongDate(mockTestSuiteB.longDate1)).toEqual(mockTestSuiteB.weekNumber1);
        }));

        const standardTestInputs: ITestInputs[] = [
            {testCase: 'empty string', actualValue: TestStandardInputsSuite.emptyInput, expectedValue: undefined},
            {testCase: 'string', actualValue: TestStandardInputsSuite.stringInput, expectedValue: undefined},
            {testCase: 'number', actualValue: TestStandardInputsSuite.numberInput, expectedValue: undefined},
        ];
        standardTestInputs.forEach(({testCase, actualValue, expectedValue}) => {
            it(`for the wrong input "${testCase}", expected "${expectedValue}" to return`, inject([DatePickerService], (service: DatePickerService) => {
                expect(service.returnWeekNumberFromLongDate(actualValue)).toBe(expectedValue);
            }));
        });
    });

    describe('Convert the year, week and day into a long date', () => {
        const mockTestSuiteB = new TestMockDateSuiteB;
        it(`for the correct input "${mockTestSuiteB.datePackage1.year}, ${mockTestSuiteB.datePackage1.weekDay},
            ${mockTestSuiteB.datePackage1.week}", expected "${mockTestSuiteB.longDate1}" to return`,
            inject([DatePickerService], (service: DatePickerService) => {
            expect(service.convertYearWeekDayIntoLongDate(mockTestSuiteB.datePackage1)).toEqual(mockTestSuiteB.longDate1);
        }));

        const standardTestInputs: ITestInputs[] = [
            {testCase: 'empty string', actualValue: TestStandardInputsSuite.emptyInput, expectedValue: undefined},
            {testCase: 'string', actualValue: TestStandardInputsSuite.stringInput, expectedValue: undefined},
            {testCase: 'number', actualValue: TestStandardInputsSuite.numberInput, expectedValue: undefined},
        ];
        standardTestInputs.forEach(({testCase, actualValue, expectedValue}) => {
            it(`for the wrong input "${testCase}", expected "${expectedValue}" to return`, inject([DatePickerService], (service: DatePickerService) => {
                expect(service.convertYearWeekDayIntoLongDate(actualValue)).toBe(expectedValue);
            }));
        });
    });

    describe('Change date by giving a number of days that it should increase: ', () => {
        const mockTestSuiteB = new TestMockDateSuiteB;
        const testDifferemtDates = [
            {testCase: 'add less than one week', date: mockTestSuiteB.longDate1, days: mockTestSuiteB.increaseDays1, expectedValue: mockTestSuiteB.increaseDays1_longDate},
            {testCase: 'add more than one week', date: mockTestSuiteB.longDate1, days: mockTestSuiteB.increaseDays2, expectedValue: mockTestSuiteB.increaseDays2_longDate},
            {testCase: 'subtract days', date: mockTestSuiteB.longDate1, days: mockTestSuiteB.decreaseDays1, expectedValue: mockTestSuiteB.decreaseDays1_longDate},
        ];
        testDifferemtDates.forEach(({testCase, date, days, expectedValue}) => {
            it(`${testCase}: Add ${days} to ${date} and expect ${expectedValue}`, inject([DatePickerService], (service: DatePickerService) => {
                expect(service.addNumberOfDaysToCurrentDate(date, days)).toEqual(expectedValue);
            }));
        });

    });

    describe('Convert a long date into year, week and weekDay', () => {
        const mockTestSuiteB = new TestMockDateSuiteB;
        mockTestSuiteB.datePackage2.longDate = new Date('Wed May 29 2019 00:00:00 GMT+0200 (South Africa Standard Time)');

        it(`for the correct input "${mockTestSuiteB.datePackage2.longDate}", expected "2019, 22, 3" to return`,
            inject([DatePickerService], (service: DatePickerService) => {
            service.insertYearWeekWeekdayIntoIDate(mockTestSuiteB.datePackage2);
            expect(mockTestSuiteB.datePackage2.year).toEqual(2019);
            expect(mockTestSuiteB.datePackage2.week).toEqual(22);
            expect(mockTestSuiteB.datePackage2.weekDay).toEqual(3);
        }));

    });

    describe('Get all timeStampid\'s for a week', () => {
        const mockTestSuiteB = new TestMockDateSuiteB;
        mockTestSuiteB.datePackage2.longDate = new Date('Wed May 29 2019 00:00:00 GMT+0200 (South Africa Standard Time)');

        it(`for the correct input "${mockTestSuiteB.datePackage2.longDate}", expected "2019, 22, 3" to return`,
            inject([DatePickerService], (service: DatePickerService) => {
            service.insertYearWeekWeekdayIntoIDate(mockTestSuiteB.datePackage2);
            expect(mockTestSuiteB.datePackage2.year).toEqual(2019);
            expect(mockTestSuiteB.datePackage2.week).toEqual(22);
            expect(mockTestSuiteB.datePackage2.weekDay).toEqual(3);
        }));

    });

});
