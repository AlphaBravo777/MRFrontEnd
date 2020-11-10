import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray } from '@ng-stack/forms';
import { MockComponent } from 'ng-mocks';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { ProductionStockByFactoryArea_MockFunction } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IContainerWithStockTakeAmount, IProductionStockByFactoryArea } from '../../../#shared-services/production-stock.interface';
import { ProductStockFormService } from '../../1#product-stock-services/product-stock-form.service';
import { StockBatchesComponent } from '../stock-batches/stock-batches.component';

import { StockItemsComponent } from './stock-items.component';

describe('StockItemsComponent', () => {
    let component: StockItemsComponent;
    let fixture: ComponentFixture<StockItemsComponent>;
    let productStockFormService: ProductStockFormService
    let productionStockListGroupsMock: IProductionStockByFactoryArea[];
    let factoryAreaProducts: FormArray<IContainerWithStockTakeAmount>;
    let mainStockForm: FormArray<IProductionStockByFactoryArea>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StockItemsComponent, MockComponent(StockBatchesComponent)],
            imports: [MaterialConfigModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StockItemsComponent);
        productStockFormService = TestBed.inject(ProductStockFormService);
        component = fixture.componentInstance;
        productionStockListGroupsMock = ProductionStockByFactoryArea_MockFunction()
        mainStockForm = productStockFormService.createMainStockFormGroup(productionStockListGroupsMock)
        factoryAreaProducts = mainStockForm.controls[0].get("factoryAreaProducts")
        component.factoryAreaProducts = factoryAreaProducts
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('@Input values', () => {

        it('should have data before initialization', () => {
            expect(component.factoryAreaProducts).toBe(factoryAreaProducts, ' == There should be data because component does not initialize without data == ')
        })

        it('should have data after initialization', () => {
            component.factoryAreaProducts = factoryAreaProducts
            fixture.detectChanges();
            expect(component.factoryAreaProducts).toBe(factoryAreaProducts, ' == There should be data in the @Input variable == ')
        })
    })

});
