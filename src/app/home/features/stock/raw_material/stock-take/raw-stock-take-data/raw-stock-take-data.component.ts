import { Component, OnInit } from '@angular/core';
import { RawMaterialDataService } from '../../raw-material-services/raw-material-data.service';

@Component({
    selector: 'app-raw-stock-take-data',
    templateUrl: './raw-stock-take-data.component.html',
    styleUrls: ['./raw-stock-take-data.component.css']
})
export class RawStockTakeDataComponent implements OnInit {

    stockTakeData;
    isMobile;
    clicked: string;
    showKeyboard;
    viewHeading = 'Dry Store Stocktake';
    headings = ['Name', 'Model Stock', 'Days', 'Supplier', 'Amt'];
    dataPoints = ['stockName', 'supplier', 'baseUnitSize', 'measureUnit'];

    constructor(public rawMaterialDataService: RawMaterialDataService) {
        this.showKeyboard = this.isTouchDevice();
        console.log(this.showKeyboard);
     }

    ngOnInit() {
        this.rawMaterialDataService.returnStockTakeData().subscribe(data => {
            this.stockTakeData = data;
            console.log(this.stockTakeData);
        });
        this.isMobile = this.isTouchDevice();
        const val = '(5 + 5) * 3';
        const number = Function('"use strict"; return (' + val + ')')();
        console.log(number, this.isTouchDevice());
    }

    isTouchDevice() {
        if ('ontouchstart' in document.documentElement) {
            return true;
        } else {
            return false;
        }
    }

    one() {
        console.log('One was clicked');
    }

    two() {
        // if (this.clicked) {
        // this.clicked = this.clicked + 1;
        // } else {
        //     this.clicked = 1;
        // }
        // console.log('Two was clicked');
    }

    keyPress(key) {
        console.log(key);
        if (this.clicked) {
            this.clicked = this.clicked + key;
        } else {
            this.clicked = key;
        }
        console.log('Two was clicked');
    }

    keyPressed(key) {
        console.log(key);
        if (this.clicked) {
            this.clicked = this.clicked + key;
        } else {
            this.clicked = key;
        }
        console.log('Two was clicked');
    }

}
