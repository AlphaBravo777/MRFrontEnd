import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@ng-stack/forms';
import { IProductionStockByFactoryArea, IProductionStock } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';

@Component({
    selector: 'stock-production-stock-view',
    templateUrl: './production-stock-view.component.html',
    styleUrls: ['./production-stock-view.component.scss']
})
export class ProductionStockViewComponent implements OnInit {

    @Input() productionStock: IProductionStockByFactoryArea[]
    @Input() mainStockForm: FormArray<IProductionStockByFactoryArea>

    constructor() { }

    ngOnInit(): void {
        console.log('the data = ', this.mainStockForm)
    }



}
