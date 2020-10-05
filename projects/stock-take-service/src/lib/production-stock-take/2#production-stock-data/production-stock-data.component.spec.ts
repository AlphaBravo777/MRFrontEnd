import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay, last } from 'rxjs/operators';
import { asyncData, asyncError } from 'src/assets/mockData/async-observable-helpers';
import { ProductionStockByFactoryArea_MockFunction, ProductionStockList_GroupsMockFunc } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionStockByFactoryArea } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';
import { ProductionStockViewComponent } from '../3#production-stock-view/production-stock-view.component';
import { MockComponent } from 'ng-mocks';

import { ProductionStockDataComponent } from './production-stock-data.component';

describe('ProductionStockDataComponent', () => {

    let component: ProductionStockDataComponent;
    let fixture: ComponentFixture<ProductionStockDataComponent>;
    let ProductionStockSingleDataMock: IProductionStockByFactoryArea[];
    let noDataMessage = "No data found ..."
    let getQuoteSpy: jasmine.Spy;
    let quoteEl: HTMLElement;

    // This would be something that we do if our child component is going to become more due to a *ngFor loop in the parent
    // function childComponents(): ProductionStockViewComponent[] {
    //     return fixture.debugElement
    //         .queryAll(By.directive(ChildComponent))
    //         .map(el => el.componentInstance);
    // }

    // Helper function to get the error message element value
    // An *ngIf keeps it out of the DOM until there is an error
    const errorMessage = () => {
        const el = fixture.nativeElement.querySelector('.error');
        return el ? el.textContent : null;
    };


    beforeEach(() => {

        ProductionStockSingleDataMock = ProductionStockByFactoryArea_MockFunction();
        // Create a fake TwainService object with a `getQuote()` spy
        const twainService = jasmine.createSpyObj('ProductionStockService', ['getAllProducts']);
        // Make the spy return a synchronous Observable with the test data
        getQuoteSpy = twainService.getAllProducts.and.returnValue(of(ProductionStockSingleDataMock));

        TestBed.configureTestingModule({
            declarations: [ProductionStockDataComponent, MockComponent(ProductionStockViewComponent)],

            providers: [{ provide: ProductionStockService, useValue: twainService }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductionStockDataComponent);
        component = fixture.componentInstance;
        quoteEl = fixture.nativeElement.querySelector('.twain');
    });


    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('LIST: ', ProductionStockList_GroupsMockFunc())
    });

    describe('when test with synchronous observable', () => {

        it('should not show data before component initialized', () => {
            expect(quoteEl.textContent).toBe('', 'nothing should be displayed');
            console.log('Async data before onInit = ', component.productionStock)
            expect(getQuoteSpy.calls.any()).toBe(false, 'observable not yet called');
        });

        it('should show data after component initialized', () => {
            fixture.detectChanges();  // onInit()
            console.log('Async data after onInit = ', component.productionStock)
            expect(getQuoteSpy.calls.any()).toBe(true, 'getAllProducts should be called');
        });

    })

    describe('when test with asynchronous observable', () => {

        beforeEach(() => {
            // Simulate delayed observable values with the `asyncData()` helper
            getQuoteSpy.and.returnValue(asyncData(ProductionStockSingleDataMock));
        });

        it('should not show data before OnInit', () => {
            expect(quoteEl.textContent).toBe('', 'nothing should be displayed');
            expect(getQuoteSpy.calls.any()).toBe(false, 'observable not yet called');
        });

        it('should still not show data after component initialized', () => {
            fixture.detectChanges();
            // getQuote service is async => still has not returned with quote
            // so should show the start value, '...'
            expect(quoteEl.textContent).toBe(noDataMessage, 'should show placeholder');
            expect(getQuoteSpy.calls.any()).toBe(true, 'getQuote called');
        });

        it('should show data after getQuote (fakeAsync)', fakeAsync(() => {
            fixture.detectChanges();  // ngOnInit()
            expect(quoteEl.textContent).toBe(noDataMessage, 'should show placeholder');
            expect(component.productionStock).toBe(undefined, 'should show placeholder');

            tick();                   // flush the observable to get the quote
            fixture.detectChanges();  // update view

            expect(component.productionStock).toBe(ProductionStockSingleDataMock, 'should show data');  //////////////////
            expect(quoteEl.textContent).not.toBe(noDataMessage, 'should not show placeholder');
        }));

        it('should show data after getQuote (async)', async(() => {
            fixture.detectChanges();  // ngOnInit()
            expect(quoteEl.textContent).toBe(noDataMessage, 'should show placeholder');

            fixture.whenStable().then(() => {  // wait for async getQuote
                fixture.detectChanges();         // update view with quote
                expect(component.productionStock).toBe(ProductionStockSingleDataMock, 'should show data');
                expect(quoteEl.textContent).not.toBe(noDataMessage, 'should not show placeholder');
            });
        }));

        it('should show last data (data done)', (done: DoneFn) => {
            fixture.detectChanges();

            component.productionStock$.pipe(last()).subscribe(() => {
                fixture.detectChanges();  // update view with quote
                expect(component.productionStock).toBe(ProductionStockSingleDataMock, 'should show last data');
                expect(errorMessage()).toBeNull('should not show error');
                done();
            });
        });

        it('should show data after getQuote (spy done)', (done: DoneFn) => {
            fixture.detectChanges();

            // the spy's most recent call returns the observable with the test data
            getQuoteSpy.calls.mostRecent().returnValue.subscribe(() => {
                fixture.detectChanges();  // update view with data
                expect(component.productionStock).toBe(ProductionStockSingleDataMock, 'should show last data');
                expect(errorMessage()).toBeNull('should not show error');
                done();
            });
        });


        it('should display error when TwainService fails', fakeAsync(() => {
            // tell spy to return an async error observable
            // getQuoteSpy.and.returnValue(asyncError<string>('TwainService test failure'));
            getQuoteSpy.and.returnValue(asyncError<string>('Failure with retrieving data'));

            fixture.detectChanges();
            tick();                   // component shows error after a setTimeout()
            fixture.detectChanges();  // update error message

            expect(errorMessage()).toMatch(/Failure with retrieving data/, 'should display error');
            // expect(quoteEl.textContent).toBe(noDataMessage, ' == should show placeholder == ');
        }));
    });

});
