import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@ng-stack/forms';
import { IContainerInfo } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { IContainerWithStockTakeAmount, IStockTakeAmountPerBatch } from '../../../#shared-services/production-stock.interface';
import { ITotalStockGroupedByProducts } from '../../../#shared-services/total-stock.interface';

@Component({
    selector: 'stock-stock-value',
    templateUrl: './stock-value.component.html',
    styleUrls: ['./stock-value.component.scss']
})
export class StockValueComponent implements OnInit {

    @Input() containerHashIndex: IContainerInfo
    // @Input() productContainers: FormArray<IContainerWithStockTakeAmount>
    @Input() product: FormGroup<ITotalStockGroupedByProducts>
    valueToDisplay = 0

    constructor() { }

    ngOnInit(): void {
        this.itterateThroughContainers()
    }

    itterateThroughContainers() {
        const productContainers = this.product.get('productContainerData').controls
        for (let index = 0; index < productContainers.length; index++) {
            const element: IContainerWithStockTakeAmount = productContainers[index].value;
            if (this.containerHashIndex.containerid === element.containerNameid) {
                // console.log('# # # ', element)
                this.itterateThroughBatches(element.stockTakeAmount, element.productContainerWeight, this.product.get('productWeight'))
            }
        }
    }

    itterateThroughBatches(batches: IStockTakeAmountPerBatch[], productContainerWeight: number, productWeightControl: FormControl<number>) {
        // console.log('productContainerWeight = ', productContainerWeight)
        for (let index = 0; index < batches.length; index++) {
            const element = batches[index];
            this.valueToDisplay += element.amount
            const currentProductWeight = productWeightControl.value
            productWeightControl.setValue(currentProductWeight + (element.amount * productContainerWeight))
        }
    }

}
