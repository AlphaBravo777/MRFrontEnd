import { TestBed } from '@angular/core/testing';

import { DatePickerGraphqlApiService } from './date-picker-graphql-api.service';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { DatePickerGraphqlStringService } from './date-picker-graphql-string.service';
import { DateApiReturnTestData } from 'src/assets/mockData/date.mocks';

describe('DatePickerGraphqlApiService', () => {
    let service: DatePickerGraphqlApiService;
    let controller: ApolloTestingController;
    let stringDocs: DatePickerGraphqlStringService;
    let dateApiReturnTestData: DateApiReturnTestData;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ApolloTestingModule],
        });
        service = TestBed.get(DatePickerGraphqlApiService);
        stringDocs = TestBed.get(DatePickerGraphqlStringService);
        controller = TestBed.get(ApolloTestingController);
        dateApiReturnTestData = new DateApiReturnTestData();
    });

    afterEach(() => {
        controller.verify();
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('shifts should be fetched', () => {
        service.getShifts().subscribe(
            result => {
                expect(result).toEqual(dateApiReturnTestData.shiftReturnData);
            },
            // This is to make sure that you do not have an error and think the top asserts have passed.
            error => expect(false).toEqual(true)
        );
        controller.expectOne(stringDocs.GET_ALL_SHIFTS).flush(dateApiReturnTestData.TEST_S);
    });

});
