import { Component, OnInit, OnDestroy } from '@angular/core';
import { PnpPalletsService } from '../1#pnp-pallets-services/pnp-pallets.service';
import { Subscription, Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { PnpSharedService } from 'src/app/home/shared/services/pnpServices/pnp-shared.service';
import { IPnPOrder } from 'src/app/home/shared/services/pnpServices/pnp-shared-interfaces';

@Component({
    selector: 'app-pnp-pallets-data',
    templateUrl: './pnp-pallets-data.component.html',
    styleUrls: ['./pnp-pallets-data.component.scss']
})
export class PnpPalletsDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    calcKeepProductsTogether;
    calculatedPallets;
    lugsByRegionSummary;
    tempLugsByRegionSummary;
    currentDatePackage: IDate;
    pnpOrderTotals: number;
    orders: IPnPOrder[];
    totalAmountOfEachProduct;
    pnpOrderMatrix;

    constructor(
        private pnpPalletService: PnpPalletsService,
        private getDateService: GetDate$Service,
        private pnpSharedService: PnpSharedService) {}

    ngOnInit() {
        this.getPnPOrder();

    }

    getPnPOrder() {
        this.subscription = this.getDateService.currentDatePackage$.pipe(
            tap(datePackage => this.currentDatePackage = datePackage),
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
        return this.pnpPalletService.getPnPOrderForDateGiven(datePackage).pipe(
        tap(data => console.log('The data of the pnp Order = ', data)),
        tap(data => this.orders = data),
        tap(data => this.tempLugsByRegionSummary = this.pnpPalletService.calculateTotalPalletsForRegions(data)),
        map(data => this.pnpPalletService.calculatePalletOptions(data)),
        tap(data => console.log('The data going to view = ', data)),
        tap(data => this.lugsByRegionSummary = this.pnpPalletService.addTotalPalletsToLugsSummary(this.tempLugsByRegionSummary, data)),
        tap(data => this.calculatedPallets = data),
        switchMap(() => this.pnpSharedService.calculateTotalPnPOrderWeightForDate(JSON.parse(JSON.stringify(this.orders)))),
        tap(data => console.log('Total PnP Order Weight = ', data)),
        tap(data => this.pnpOrderTotals = data),
        switchMap(() => this.pnpSharedService.createPnPRegionsAndProductsMatrix(this.orders)),
        tap((data) => this.pnpOrderMatrix = data)
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
