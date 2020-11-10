import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@ng-stack/forms';
import { IContainerWithStockTakeAmount, IProductionStockByFactoryArea } from '../../../#shared-services/production-stock.interface';

@Component({
    selector: 'stock-stock-items',
    templateUrl: './stock-items.component.html',
    styleUrls: ['./stock-items.component.scss'],
    
})
export class StockItemsComponent implements OnInit, AfterViewInit {

    @Input() productionStockList: IContainerWithStockTakeAmount[]
    @Input() factoryAreaProducts: FormArray<IContainerWithStockTakeAmount>;
    @ViewChildren('productMRid') productMRidElements: QueryList<ElementRef>;
    @ViewChildren('proddescription') proddescriptionElements: QueryList<ElementRef>;

    productMRidColmWidth = 50
    styleStockItemGrid = {}

    ngOnInit(): void {
    }

    styleObjectMessageContainer() {
        this.styleStockItemGrid = {
            'display': 'grid',
            // 'grid-template-columns': this.productMRidColmWidth.toString() + 'px' + ' 150px 60px 1fr',
            'grid-template-columns': '100px 150px 60px 1fr',
        }
    }

    ngAfterViewInit() {
        // this.resizeColumns();
    }

    resizeColumns() {
        // let productMRidColmWidth = 50
        this.productMRidElements.forEach(th => this.productMRidColmWidth = 
            th.nativeElement.offsetWidth > this.productMRidColmWidth ? th.nativeElement.offsetWidth : this.productMRidColmWidth);
        this.styleObjectMessageContainer()
        console.log('productMRidColmWidth = ', this.productMRidColmWidth)
    }

    // Add batches in
    //  When there are batches, maybe show them on a new line
    //  It should only check if there are batches or not

    // Make a print and a read-in view, with two buttons selecting between them
    //  In the read in view maybe show the data of the previous stock take
    //  Add a button to add a batch number, the first batch would have to contain all the products, and then you will carry on from there
    // Maybe this can happen with the other products as well, maybe a small menu, where you can pick which batches to add
    // Maybe have a boolean if product should work with batches or not
    // Make it possible, if you click on product then you can go and edit it

}
