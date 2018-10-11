import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-proc-stock-take-data',
    templateUrl: './proc-stock-take-data.component.html',
    styleUrls: ['./proc-stock-take-data.component.scss']
})
export class ProcStockTakeDataComponent implements OnInit {

    constructor() { }

    packagingLine = 'box.png';
    // tslint:disable-next-line
    singleProduct = { id: 1, prodCode: 'SV1', batchName: 'SV', brand: 'vencor', packaging: 'Vacuum', unitWeight: 1, description: 'Vencor SV 1kg Vacuum', batchColor: '#d9ecff' };

    ngOnInit() {

    }

    clicked() {
        console.log('I was clicked');
    }

}
