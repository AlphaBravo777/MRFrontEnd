import { Component, OnInit } from '@angular/core';
import { RawMaterialDataService } from '../../raw-material-services/raw-material-data.service';
import { IRawMaterialGroup } from '../../raw-material-services/RawMaterial';

@Component({
    selector: 'app-raw-stock-take-data',
    templateUrl: './raw-stock-take-data.component.html',
    styleUrls: ['./raw-stock-take-data.component.css']
})
export class RawStockTakeDataComponent implements OnInit {

    stockTakeData: IRawMaterialGroup[];
    viewHeading = 'Dry Store Stocktake';
    headings = ['Name', 'Supplier', 'Base Size', 'Units'];
    dataPoints = ['stockName', 'supplier', 'baseUnitSize', 'measureUnit'];
    gridColmSizes = 'grid4';

    constructor(public rawMaterialDataService: RawMaterialDataService) { }

    ngOnInit() {
        this.rawMaterialDataService.returnStockTakeData().subscribe(data => {
            this.stockTakeData = data;
            console.log(this.stockTakeData);
        });
        // const val = '(5 + 5) * 3';
        // const number = Function('"use strict"; return (' + val + ')')();
        // console.log(number, this.isTouchDevice());
    }


}
