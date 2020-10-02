import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductionStockMock } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionStock } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';
import { ProductionStockViewComponent } from '../3#production-stock-view/production-stock-view.component';

import { ProductionStockDataComponent } from './production-stock-data.component';

describe('ProductionStockDataComponent', () => {
    let component: ProductionStockDataComponent;
    let fixture: ComponentFixture<ProductionStockDataComponent>;
    let ProductionStockSingleDataMock: IProductionStock[];
    let getQuoteSpy: jasmine.Spy;
    let quoteEl: HTMLElement;


    beforeEach(() => {

        ProductionStockSingleDataMock = ProductionStockMock.buildList(10);
        // Create a fake TwainService object with a `getQuote()` spy
        const twainService = jasmine.createSpyObj('ProductionStockService', ['getAllProducts']);
        // Make the spy return a synchronous Observable with the test data
        getQuoteSpy = twainService.getAllProducts.and.returnValue(of(ProductionStockSingleDataMock));

        TestBed.configureTestingModule({
            declarations: [ProductionStockDataComponent, ProductionStockViewComponent],
            providers: [{ provide: ProductionStockService, useValue: twainService }]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ProductionStockDataComponent);
        component = fixture.componentInstance;
        quoteEl = fixture.nativeElement.querySelector('.twain'); 
    });
    

    it('should create', () => {
        expect(component).toBeTruthy();
    });

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



});
