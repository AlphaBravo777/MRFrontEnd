import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { PnpPickPalletsService } from './pnp-pick-pallets.service';
import { IPnPOrder } from 'src/app/home/shared/services/pnpServices/pnp-shared-interfaces';
import { PnpSharedApiService } from 'src/app/home/shared/services/pnpServices/pnp-shared-api.service';

@Injectable({
    providedIn: 'root'
})
export class PnpPalletsService {

    constructor(
        private pickPalletsService: PnpPickPalletsService,
        private pnpSharedApiService: PnpSharedApiService) {}

    getPnPOrderForDateGiven(datePackage: IDate): Observable<IPnPOrder[]> {
        return this.pnpSharedApiService.getPnPOrder(datePackage).pipe();
    }

    calculatePalletOptions(orders) {
        return this.pickPalletsService.keepProductsTogetherOption2(orders);
    }

    calculateTotalPalletsForRegions(orders) {
        const regions = [];

        const countLugSizes = (num) => {
            let largeLugs = 0;
            let smallLugs = 0;
            for (let prod = 0; prod < orders[num].products.length; prod++) {
                if (orders[num].products[prod].lugSize === 1) {
                    smallLugs = smallLugs + orders[num].products[prod].amount;
                } else {
                    largeLugs = largeLugs + orders[num].products[prod].amount;
                }
            }
            return {largeLugs: largeLugs, smallLugs: smallLugs};
        };

        for (let order = 0; order < orders.length; order++) {
            if (regions.length === 0) {
                const lugCount = countLugSizes(0);
                regions.push({accountID: orders[0].accountID, commonName: orders[0].commonName.substr(0, orders[0].commonName.indexOf(' ')),
                largeLugs: lugCount.largeLugs, smallLugs: lugCount.smallLugs});
            } else {
                let flag = true;
                for (let region = 0; region < regions.length; region++) {
                    if (orders[order].accountID === regions[region].accountID) {
                        const lugCount = countLugSizes(order);
                        regions[region].largeLugs = regions[region].largeLugs + lugCount.largeLugs;
                        regions[region].smallLugs = regions[region].smallLugs + lugCount.smallLugs;
                        flag = false;
                    }
                }
                if (flag) {
                    const lugCount = countLugSizes(order);
                    regions.push({accountID: orders[order].accountID,
                    commonName: orders[order].commonName.substr(0, orders[order].commonName.indexOf(' ')), largeLugs: lugCount.largeLugs,
                    smallLugs: lugCount.smallLugs});
                }
            }
        }
        console.log('Regions = ', regions);
        return regions;
    }

    addTotalPalletsToLugsSummary(regions, pallets) {
        for (let pallet = 0; pallet < pallets.length; pallet++) {
            for (let region = 0; region < regions.length; region++) {
                if (pallets[pallet].accountID === regions[region].accountID) {
                    if (regions[region].totalPallets) {
                        regions[region].totalPallets++;
                    } else {
                        regions[region]['totalPallets'] = 1;
                    }
                }
            }
        }
        return regions;
    }

}
