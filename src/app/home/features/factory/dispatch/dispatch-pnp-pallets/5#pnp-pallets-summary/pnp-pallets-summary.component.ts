import { Component, OnInit, Input } from '@angular/core';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Component({
    selector: 'app-pnp-pallets-summary',
    templateUrl: './pnp-pallets-summary.component.html',
    styleUrls: ['./pnp-pallets-summary.component.scss']
})
export class PnpPalletsSummaryComponent implements OnInit {

    @Input() calculatedPallets;
    @Input() currentDatePackage: IDate;
    pageBreak = 16;

    constructor() {}

    ngOnInit() {
        console.log('Here is the summary: ', this.calculatedPallets);
    }
}
