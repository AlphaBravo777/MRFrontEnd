import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { asyncData, asyncError } from 'src/assets/mockData/async-observable-helpers';
import { ProductionStockByFactoryArea_MockFunction } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionStockByFactoryArea } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';
import { ProductionStockViewComponent } from '../3#production-stock-view/production-stock-view.component';
import { MockComponent } from 'ng-mocks';

import { ProductionStockDataComponent } from './production-stock-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArray } from '@ng-stack/forms';
import { ProductStockFormService } from '../1#product-stock-services/product-stock-form.service';
import { last } from 'rxjs/operators';

describe('ProductionStockDataComponent', () => {

    let component: ProductionStockDataComponent;
    let fixture: ComponentFixture<ProductionStockDataComponent>;
    let ProductionStockSingleDataMock: IProductionStockByFactoryArea[];
    let noDataMessage = "No data found ...";
    let getAllProductsFormSpy: jasmine.Spy;
    let mainContainerElement: HTMLElement;
    let mainStockForm: FormArray<IProductionStockByFactoryArea>;
    let productStockFormService: ProductStockFormService;

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
        const productionStockService = jasmine.createSpyObj('ProductionStockService', ['getAllProducts']);
        // Make the spy return a synchronous Observable with the test data
        getAllProductsFormSpy = productionStockService.getAllProducts.and.returnValue(of(ProductionStockSingleDataMock));

        TestBed.configureTestingModule({
            declarations: [ProductionStockDataComponent, MockComponent(ProductionStockViewComponent)],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: ProductionStockService, useValue: productionStockService },
                // { provide: FormBuilder, useValue: formBuilder }
            
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductionStockDataComponent);
        productStockFormService = TestBed.inject(ProductStockFormService);
        component = fixture.componentInstance;
        mainStockForm = productStockFormService.createMainStockFormGroup(ProductionStockSingleDataMock)
        mainContainerElement = fixture.nativeElement.querySelector('.mainContainer');
    });

    describe('1 - Startup tests', () => {

        it('(a) should create', () => {
            expect(component).toBeTruthy();
        });

    })

    describe('2 - when test with synchronous observable', () => {

        it('(a) should not show data before component initialized', () => {
            // If you create the observable as a variable at the top, it will be called before the onInit() function is called to initialize it, and then this test will fail. This does not seem to be a problem if you call it with the async pipe becuase you do not set it inititally, you only say what it will be
            expect(mainContainerElement.textContent).toBe('', 'nothing should be displayed');
            expect(getAllProductsFormSpy.calls.any()).toBe(false, 'observable not yet called');
        });

        it('(b) should show data after component initialized', () => {
            fixture.detectChanges();  // onInit()
            expect(getAllProductsFormSpy.calls.any()).toBe(true, 'getAllProducts should be called');
        });

    })

    describe('3 - when test with asynchronous observable', () => {

        beforeEach(() => {
            // Simulate delayed observable values with the `asyncData()` helper
            getAllProductsFormSpy.and.returnValue(asyncData(ProductionStockSingleDataMock));
        });

        it('(a) should not show data before OnInit', () => {
            expect(mainContainerElement.textContent).toBe('', 'nothing should be displayed');
            expect(getAllProductsFormSpy.calls.any()).toBe(false, 'observable not yet called');
        });

        it('(b) should still not show data after component initialized', () => {
            fixture.detectChanges();
            // getQuote service is async => still has not returned with quote
            // so should show the start value, '...'
            expect(mainContainerElement.textContent).toBe(noDataMessage, 'should show placeholder');
            expect(getAllProductsFormSpy.calls.any()).toBe(true, 'getQuote called');
        });

        it('(c) should show data after getQuote (fakeAsync)', fakeAsync(() => {
            fixture.detectChanges();  // ngOnInit()
            expect(mainContainerElement.textContent).toBe(noDataMessage, 'should show placeholder');
            expect(component.mainStockForm).toBe(undefined, 'should show placeholder');

            tick();                   // flush the observable to get the quote
            fixture.detectChanges();  // update view

            // expect(component.mainStockForm).toEqual(mainStockForm, 'should show data');  //////////////////
            expect(component.mainStockForm).not.toEqual(undefined, 'should show data');
            expect(mainContainerElement.textContent).not.toBe(noDataMessage, 'should not show placeholder');
        }));

        it('(d) should show data after getQuote (async)', async(() => {
            fixture.detectChanges();  // ngOnInit()
            expect(mainContainerElement.textContent).toBe(noDataMessage, 'should show placeholder');

            fixture.whenStable().then(() => {  // wait for async getQuote
                fixture.detectChanges();         // update view with quote
                // expect(component.mainStockForm).toBe(mainStockForm, 'should show data');
                expect(component.mainStockForm).not.toEqual(undefined, 'should show data');
                expect(mainContainerElement.textContent).not.toBe(noDataMessage, 'should not show placeholder');
            });
        }));

        it('(e) should show last data (data done)', (done: DoneFn) => {
            fixture.detectChanges();

            component.productionStockData$.pipe(last()).subscribe(() => {
                fixture.detectChanges();  // update view with quote
                // expect(component.mainStockForm).toBe(mainStockForm, 'should show last data');
                expect(errorMessage()).toBeNull('should not show error');
                done();
            });
        });

        it('(f) should show data after getQuote (spy done)', (done: DoneFn) => {
            fixture.detectChanges();

            // the spy's most recent call returns the observable with the test data
            getAllProductsFormSpy.calls.mostRecent().returnValue.subscribe(() => {
                fixture.detectChanges();  // update view with data
                // expect(component.mainStockForm).toBe(mainStockForm, 'should show last data');
                expect(component.mainStockForm).not.toEqual(undefined, 'should show data');
                expect(errorMessage()).toBeNull('should not show error');
                done();
            });
        });

        // No error message available anymore
        // it('g) should display error when TwainService fails', fakeAsync(() => {
        //     // tell spy to return an async error observable
        //     getAllProductsFormSpy.and.returnValue(asyncError<string>('Failure with retrieving data'));

        //     fixture.detectChanges();
        //     tick();                   // component shows error after a setTimeout()
        //     fixture.detectChanges();  // update error message

        //     expect(errorMessage()).toMatch(/Failure with retrieving data/, 'should display error');
        //     // expect(mainContainerElement.textContent).toBe(noDataMessage, ' == should show placeholder == ');
        // }));
    });

});
