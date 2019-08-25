import { Component, OnInit, OnDestroy } from '@angular/core';
import { PnpPalletsService } from '../1#pnp-pallets-services/pnp-pallets.service';
import { Subscription, Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { PnpSharedService } from 'src/app/home/shared/services/pnpServices/pnp-shared.service';
import { IPnPRegions, IPalletPickedDetails,
    IPnPOrderTotals, IPnPOrderMatrix } from 'src/app/home/shared/services/pnpServices/pnp-shared-interfaces';
import { IOrderDetails } from 'projects/insert-order-service/src/lib/#sharedServices/interfaces/insert-order-service-Interfaces';

@Component({
    selector: 'app-pnp-pallets-data',
    templateUrl: './pnp-pallets-data.component.html',
    styleUrls: ['./pnp-pallets-data.component.scss']
})
export class PnpPalletsDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    calculatedPallets: IPalletPickedDetails[];
    lugsByRegionSummary: IPnPRegions[];
    currentDatePackage: IDate;
    pnpOrderTotals: IPnPOrderTotals;
    orders: IOrderDetails[];
    pnpOrderMatrix: IPnPOrderMatrix;

    constructor(
        private pnpPalletService: PnpPalletsService,
        private getDateService: GetDate$Service,
        private pnpSharedService: PnpSharedService) {}

    ngOnInit() {
        this.getPnPOrder();

    }

    getPnPOrder() {
        this.subscription = this.getDateService.currentDatePackage$.pipe(
            tap(datePackage => this.currentDatePackage = JSON.parse(JSON.stringify(datePackage))),
            switchMap(datePackage => {
                if (datePackage.id === null) {
                    return of([]);
                } else {
                    return this.workingDate(datePackage);
                }
            })
        ).subscribe();
    }

    workingDate(datePackage: IDate): Observable<any> {
        // return this.pnpPalletService.getPnPOrderForDateGiven(datePackage).pipe(
        return this.pnpPalletService.searchForOrdersMain(datePackage).pipe(
            tap(data => console.log('The data of the pnp Order = ', data)),
            tap(data => this.orders = data),
            tap(data => this.lugsByRegionSummary = this.pnpPalletService.calculateTotalPalletsForRegions(data)),
            map(data => this.pnpPalletService.calculatePalletOptions(data)),
            tap(pickedPallets => console.log('The data going to view = ', pickedPallets)),
            tap(pickedPallets =>
                this.lugsByRegionSummary = this.pnpPalletService.addTotalPalletsToLugsSummary(this.lugsByRegionSummary, pickedPallets)),
            tap(pickedPallets => this.calculatedPallets = pickedPallets),
            switchMap(() => this.pnpSharedService.calculateTotalPnPOrderWeightForDate(JSON.parse(JSON.stringify(this.orders)))),
            tap(orderTotals => console.log('Total PnP Order Weight = ', orderTotals)),
            tap(orderTotals => this.pnpOrderTotals = orderTotals),
            switchMap(() => this.pnpSharedService.calculateTotalPalletsForOrder(this.calculatedPallets)),
            tap(totalPalletsForOrder => this.pnpOrderTotals.pnpOrderTotalPallets = totalPalletsForOrder),
            switchMap(() => this.pnpSharedService.createPnPRegionsAndProductsMatrix(this.orders)),
            tap((data) => this.pnpOrderMatrix = data),
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
