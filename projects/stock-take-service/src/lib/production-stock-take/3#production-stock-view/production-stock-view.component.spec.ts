import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductionStockByFactoryArea_MockFunction } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionStockByFactoryArea, IProductionStock } from '../../#shared-services/production-stock.interface';
import { MockComponent } from 'ng-mocks';

import { ProductionStockViewComponent } from './production-stock-view.component';
import { StockItemsComponent } from './stock-items/stock-items.component';
import { FormArray } from '@ng-stack/forms';
import { ProductStockFormService } from '../1#product-stock-services/product-stock-form.service';

describe('ProductionStockViewComponent', () => {
    let component: ProductionStockViewComponent;
    let fixture: ComponentFixture<ProductionStockViewComponent>;
    let productionStockListGroupsMock: IProductionStockByFactoryArea[];
    let productStockFormService: ProductStockFormService
    let mainStockForm: FormArray<IProductionStockByFactoryArea>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductionStockViewComponent, MockComponent(StockItemsComponent)]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductionStockViewComponent);
        productStockFormService = TestBed.inject(ProductStockFormService);
        component = fixture.componentInstance;
        productionStockListGroupsMock = ProductionStockByFactoryArea_MockFunction()
        mainStockForm = productStockFormService.createMainStockForm(productionStockListGroupsMock)
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('@Input values', () => {

        it('should be nothing before initialization', () => {
            expect(component.mainStockForm).toBe(undefined, ' == There should be no data == ')
        })

        it('should have data after initialization', () => {
            component.mainStockForm = mainStockForm
            fixture.detectChanges();
            expect(component.mainStockForm).toBe(mainStockForm, ' == There should be data in the @Input variable == ')
        })
    }) 

    describe('Test *ngFor ', () => {

        it('should create right amount of divs', () => {
            component.mainStockForm = mainStockForm
            fixture.detectChanges();
            const factoryAreaDivs = fixture.debugElement.queryAll(By.css('.factoryAreas'));
            expect(factoryAreaDivs.length).toBe(productionStockListGroupsMock.length)
        })

        it('first heading should match first data', () => {
            component.mainStockForm = mainStockForm
            fixture.detectChanges();
            const factoryAreaSpans = fixture.debugElement.queryAll(By.css('.factoryAreas span'));
            expect(factoryAreaSpans[0].nativeNode.innerHTML).toEqual(productionStockListGroupsMock[0].factoryAreaName)
        })
    }) 

    


});
