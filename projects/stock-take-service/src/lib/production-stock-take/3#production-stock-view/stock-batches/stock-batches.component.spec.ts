import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray } from '@ng-stack/forms';
import { IBatchInfo } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { ProductionStockByFactoryArea_MockFunction } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IContainerWithStockTakeAmount, IProductionStockByFactoryArea } from '../../../#shared-services/production-stock.interface';
import { ProductStockFormService } from '../../1#product-stock-services/product-stock-form.service';

import { StockBatchesComponent } from './stock-batches.component';

describe('StockBatchesComponent', () => {
    let component: StockBatchesComponent;
    let fixture: ComponentFixture<StockBatchesComponent>;
    let productStockFormService: ProductStockFormService;
    let productionStockListGroupsMock: IProductionStockByFactoryArea[];
    let mainStockForm: FormArray<IProductionStockByFactoryArea>;
    let factoryAreaProducts: FormArray<IContainerWithStockTakeAmount>;
    let stockBatches: FormArray<IBatchInfo>
    let showBatches: boolean

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StockBatchesComponent],
            imports: [MaterialConfigModule, BrowserAnimationsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StockBatchesComponent);
        productStockFormService = TestBed.inject(ProductStockFormService);
        component = fixture.componentInstance;
        productionStockListGroupsMock = ProductionStockByFactoryArea_MockFunction();
        mainStockForm = productStockFormService.createMainStockFormGroup(productionStockListGroupsMock);
        factoryAreaProducts = mainStockForm.controls[0].get("factoryAreaProducts");
        stockBatches = factoryAreaProducts.controls[0].get("stockBatches");
        showBatches = factoryAreaProducts.controls[0].get("showBatches").value;
        component.showBatchesBool = showBatches; // We can add data from the beginning, cause this component wont create without data
        component.batchesFormArray = stockBatches;  // We can add data from the beginning, cause this component wont create without data
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
