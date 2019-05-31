import { TestBed } from '@angular/core/testing';

import { GetNewDateByAddingOrSubtractingService } from './get-new-date-by-adding-or-subtracting.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { of } from 'rxjs';
import { GetDate$Service } from './get-date$.service';
import { mockDatePackage, mockLongDate, mockLongDatePlus7DaysMinus3Hours } from './date.mocks';

describe('GetNewDateByAddingOrSubtractingService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule, ApolloTestingModule ],
            // providers: [ { provide: GetDate$Service, useValue: {data: testDate}} ]
        })
    );

    it('should have a service instance', () => {
        const service: GetNewDateByAddingOrSubtractingService = TestBed.get(
            GetNewDateByAddingOrSubtractingService
        );
        expect(service).toBeDefined();
    });

    it('should return an IDate format', () => {
        const service: GetNewDateByAddingOrSubtractingService = TestBed.get(
            GetNewDateByAddingOrSubtractingService
        );
        const getDate$Service: GetDate$Service = TestBed.get(
            GetDate$Service
        );
        const getDate$ServiceSpy = spyOn(getDate$Service, 'getDatePackageForGivenLongDate').and.returnValue(
            of(mockDatePackage)
        );
        service.calculateNewDate(mockDatePackage).subscribe(data => {
            expect(data).toEqual(mockDatePackage);
        });
        expect(getDate$ServiceSpy).toHaveBeenCalled();
        expect(getDate$ServiceSpy).toHaveBeenCalledWith(mockLongDate);
    });

    it('should be called with IDate argument', () => {
        const service: GetNewDateByAddingOrSubtractingService = TestBed.get(
            GetNewDateByAddingOrSubtractingService
        );
        const serviceSpy = spyOn(service, 'calculateNewDate').and.returnValue(
            of(mockDatePackage)
        );
        service.calculateNewDate(mockDatePackage).subscribe(data => {
            expect(data).toEqual(mockDatePackage);
        });
        expect(serviceSpy).toHaveBeenCalled();
        expect(serviceSpy).toHaveBeenCalledWith(mockDatePackage);
    });

    it('should increase by one week and decrease by 3 hours', () => {
        const service: GetNewDateByAddingOrSubtractingService = TestBed.get(
            GetNewDateByAddingOrSubtractingService
        );
        expect(service['dateByChangingDays'](mockLongDate, 7, 0)).toBeDefined();
        expect(service['dateByChangingDays'](mockLongDate, 7, -3)).toEqual(mockLongDatePlus7DaysMinus3Hours);
    });
});
