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

    describe('Transform long date to short date', () => {
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
        it(`for the correct input "${mockTestSuiteB.longDate1}", expected "${mockTestSuiteB.weekDayString}" to return`,
            inject([DatePickerService], (service: DatePickerService) => {
            expect(service.returnWeekdayNameFromLongDate(mockTestSuiteB.longDate1)).toEqual(mockTestSuiteB.weekDayString);
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
                expect(service.convertLongDateToShortDate(actualValue)).toBe(expectedValue);
            }));
        });
    });

});
