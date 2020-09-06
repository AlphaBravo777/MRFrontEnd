import { TestBed } from '@angular/core/testing';

import { GetNewDateByAddingOrSubtractingService } from './get-new-date-by-adding-or-subtracting.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { of } from 'rxjs';
import { GetDate$Service } from './get-date$.service';
import { mockDatePackage, mockLongDateGroup1, mockLongDatePlus7DaysMinus3Hours } from './date.mocks';

describe('GetNewDateByAddingOrSubtractingService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule, ApolloTestingModule ],
            // This is what you do if you do not use a spy I think
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
        // Here we get the service that we want to test
        const service: GetNewDateByAddingOrSubtractingService = TestBed.get(
            GetNewDateByAddingOrSubtractingService
        );
        // Here we get a service that we want to use in our test, and we want to intercept it so that we can return a value in its place
        const getDate$Service: GetDate$Service = TestBed.get(
            GetDate$Service
        );
        // Here we create a spy with the method of the above service that we want to intercept and return data for, and we also say what data we want to return
        const getDate$ServiceSpy = spyOn(getDate$Service, 'getDatePackageForGivenLongDate').and.returnValue(
            of(mockDatePackage)
        );
        // Here we run the service we want to test, and give it mock data. We have to subscribe because it is an observable
        service.calculateNewDate(mockDatePackage).subscribe(data => {
            expect(data).toEqual(mockDatePackage);
        });
        // Here we make sure that our intercept was indeed called, and that it did not bypass that method
        expect(getDate$ServiceSpy).toHaveBeenCalled();
        // Here we again check that it was called, and that it was called with the data that we gave it
        expect(getDate$ServiceSpy).toHaveBeenCalledWith(mockLongDateGroup1);
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
        // This is the way you call a method if it is private
        expect(service['dateByChangingDays'](mockLongDateGroup1, 7, 0)).toBeDefined();
        expect(service['dateByChangingDays'](mockLongDateGroup1, 7, -3)).toEqual(mockLongDatePlus7DaysMinus3Hours);
    });
});
