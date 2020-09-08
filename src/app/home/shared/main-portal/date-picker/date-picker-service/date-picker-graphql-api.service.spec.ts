import { TestBed } from '@angular/core/testing';

import { DatePickerGraphqlApiService } from './date-picker-graphql-api.service';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { DatePickerGraphqlStringService } from './date-picker-graphql-string.service';
import { DateApiReturnTestData } from './date.mocks';

describe('DatePickerGraphqlApiService', () => {
    let service: DatePickerGraphqlApiService;
    let controller: ApolloTestingController;
    let stringDocs: DatePickerGraphqlStringService;
    let dateApiReturnTestData: DateApiReturnTestData;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ApolloTestingModule],
        });
        service = TestBed.inject(DatePickerGraphqlApiService);
        stringDocs = TestBed.inject(DatePickerGraphqlStringService);
        controller = TestBed.get(ApolloTestingController);
        dateApiReturnTestData = new DateApiReturnTestData();
    });

    afterEach(() => {
        controller.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('shifts should be fetched', () => {
        service.getShifts().subscribe(result => {
            expect(result[3].id).toEqual(0);
            expect(result).toEqual(dateApiReturnTestData.TEST_D2);
            console.log('The shifts are ${shifts}');
            // done();
          });
        // const op = controller.expectOne(stringDocs.GET_ALL_SHIFTS);
        controller.expectOne(stringDocs.GET_ALL_SHIFTS).flush(dateApiReturnTestData.TEST_S);

        // Finally, assert that there are no outstanding operations.
        controller.verify();
    });

});
