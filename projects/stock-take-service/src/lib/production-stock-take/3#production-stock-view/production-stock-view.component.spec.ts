import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionStockMock, ProductionStockList_GroupsMockFunc, ProductionStockByFactoryArea_MockFunction } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionStockByFactoryArea, IProductionStock } from '../../#shared-services/production-stock.interface';

import { ProductionStockViewComponent } from './production-stock-view.component';

describe('ProductionStockViewComponent', () => {
    let component: ProductionStockViewComponent;
    let fixture: ComponentFixture<ProductionStockViewComponent>;
    let productionStockListGroupsMock: IProductionStockByFactoryArea[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductionStockViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductionStockViewComponent);
        component = fixture.componentInstance;
        productionStockListGroupsMock = ProductionStockByFactoryArea_MockFunction()
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('@Input values', () => {

        it('should be nothing before initialization', () => {
            expect(component.productionStock).toBe(undefined, ' == There should be no data == ')
        })

        it('should have data after initialization', () => {
            component.productionStock = productionStockListGroupsMock
            fixture.detectChanges();
            expect(component.productionStock).toBe(productionStockListGroupsMock, ' == There should be data in the @Input variable == ')
        })
    }) 


});
