import { Component, OnInit, Input } from '@angular/core';
import { ProcStockData$Service } from '../proc-stock-services/proc-stock-data$.service';
import { ProcStockService } from '../proc-stock-services/proc-stock.service';

@Component({
    selector: 'app-proc-stock-view1',
    templateUrl: './proc-stock-view1.component.html',
    styleUrls: ['./proc-stock-view1.component.scss']
})
export class ProcStockView1Component implements OnInit {

    @Input() productGroups;
    selectedFilter = [];
    amount = '0';
    currentSelectedProduct;
    productDescription = 'Select Product';
    containerSelected = false;
    menuDroppedDown = [];

    constructor(private procStockService: ProcStockService) { }

    ngOnInit() {
    }

    changeFilter(filter, key) {
        this.selectedFilter[key] = filter;
    }

    productPicked(value) {
        this.containerSelected = true;
        this.productDescription = value.description;
        this.currentSelectedProduct = {containerID: value.productId, databaseID: value.databaseID};
        if (value.amount === undefined) {
            value.amount = '0';
        }
        this.changeAmount(value.amount);
    }

    changeAmount(amount) {
        amount = amount.toString();
        if (amount.charAt(0) === '0') {
            amount = amount.substr(1);
        }
        this.amount = amount;
    }

    inputString(value) {
        this.procStockService.changeSingleStockAmount(this.currentSelectedProduct, value);
        this.changeAmount(value);
    }

    submitStock() {
        this.procStockService.submitTicketStockToDB();
    }

    updateStock() {
        this.procStockService.updateLocalStorageStockToDB();
    }

    recoverStock() {
        this.procStockService.recoverLocalStorageStockBackIntoTickets();
    }

    dropDownTableState(value, key) {
        this.menuDroppedDown[key] = value;
        if (!value) {
            this.productDescription = 'Select Product';
            this.containerSelected = false;
        }
    }

}
