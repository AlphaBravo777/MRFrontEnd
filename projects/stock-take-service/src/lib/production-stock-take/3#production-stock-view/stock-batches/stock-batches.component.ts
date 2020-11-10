import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray } from '@ng-stack/forms';
import { IBatchInfo } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { CreateBatchData$Service } from 'projects/production-service/src/lib/create-batch/1#create-batch-services/create-batch-data$.service';
import { IStockTakeAmountPerBatch } from '../../../#shared-services/production-stock.interface';
import { ProductStockFormService } from '../../1#product-stock-services/product-stock-form.service';

@Component({
    selector: 'stock-stock-batches',
    templateUrl: './stock-batches.component.html',
    styleUrls: ['./stock-batches.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class StockBatchesComponent implements OnInit {

    @Input() batchesFormArray: FormArray<IStockTakeAmountPerBatch>;
    @Input() showBatchesBool: boolean;

    constructor(
        private createBatchData$Service: CreateBatchData$Service,
        private productStockFormService: ProductStockFormService
        ) { }

    ngOnInit(): void {
    }

    createBatch() {
        const batches: IBatchInfo[] = this.createBatchData$Service.stockBatchesFormArrayValue;
        this.batchesFormArray = this.productStockFormService.createBatchesWithoutIncomingAmountsData(batches);
    }

}
