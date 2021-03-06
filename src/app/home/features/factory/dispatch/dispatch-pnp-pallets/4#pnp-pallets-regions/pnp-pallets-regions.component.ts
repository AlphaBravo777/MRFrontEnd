import { Component, OnInit, Input } from '@angular/core';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import {
    IPnPOrderTotals,
    IPnPRegions
} from 'src/app/home/shared/services/pnpServices/pnp-shared-interfaces';

@Component({
    selector: 'app-pnp-pallets-regions',
    templateUrl: './pnp-pallets-regions.component.html',
    styleUrls: ['./pnp-pallets-regions.component.scss']
})
export class PnpPalletsRegionsComponent implements OnInit {

    @Input() lugsByRegionSummary: IPnPRegions[];
    @Input() pnpOrderTotals: IPnPOrderTotals;
    @Input() currentDatePackage: IDate;
    totalPalletsForOrder: number;

    constructor() {}

    ngOnInit() {
    }
}
