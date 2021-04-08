import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { PnpPickPalletsService } from './pnp-pick-pallets.service';
import { IPalletPickedDetails, IPnPRegions } from 'src/app/home/shared/services/pnpServices/pnp-shared-interfaces';
import { IOrderDetails } from 'projects/insert-order-service/src/lib/#sharedServices/interfaces/order-service-Interfaces';
import { OrderGraphqlApiService } from 'projects/insert-order-service/src/lib/#sharedServices/order-graphql-api.service';

@Injectable({
    providedIn: 'root'
})
export class PnpPalletsService {

    constructor(
        private pickPalletsService: PnpPickPalletsService,
        private orderGraphqlApiService: OrderGraphqlApiService) {}

    searchForOrdersMain(account: number, datePackage: IDate, routeid: number): Observable<IOrderDetails[]> {
        return this.orderGraphqlApiService.searchForOrdersMain(account, datePackage, routeid);
    }

    calculatePalletOptions(orders: IOrderDetails[]) {
        return this.pickPalletsService.calculatePalletsPerAccountMRid(orders);
    }

    calculateTotalPalletsForRegions(orders: IOrderDetails[]): IPnPRegions[] {
        // accountID does not exists
        const regions: IPnPRegions[] = [];

        const countLugSizes = (num) => {
            let largeLugs = 0;
            let smallLugs = 0;
            for (let prod = 0; prod < orders[num].orders.length; prod++) {
                if (orders[num].orders[prod].lugSize === 1) {
                    smallLugs = smallLugs + orders[num].orders[prod].amount;
                } else {
                    largeLugs = largeLugs + orders[num].orders[prod].amount;
                }
            }
            return {largeLugs: largeLugs, smallLugs: smallLugs};
        };

        for (let order = 0; order < orders.length; order++) {
            if (regions.length === 0) {
                const lugCount = countLugSizes(0);
                regions.push({regionid: orders[0].accountMRid,
                    commonName: orders[0].commonName.substr(0, orders[0].commonName.indexOf(' ')),
                    largeLugs: lugCount.largeLugs, smallLugs: lugCount.smallLugs, totalPallets: null});
            } else {
                let flag = true;
                for (let region = 0; region < regions.length; region++) {
                    if (orders[order].accountMRid === regions[region].regionid) {
                        const lugCount = countLugSizes(order);
                        regions[region].largeLugs = regions[region].largeLugs + lugCount.largeLugs;
                        regions[region].smallLugs = regions[region].smallLugs + lugCount.smallLugs;
                        flag = false;
                    }
                }
                if (flag) {
                    const lugCount = countLugSizes(order);
                    regions.push({regionid: orders[order].accountMRid,
                    commonName: orders[order].commonName.substr(0, orders[order].commonName.indexOf(' ')), largeLugs: lugCount.largeLugs,
                    smallLugs: lugCount.smallLugs, totalPallets: null});
                }
            }
        }
        console.log('Regions = ', orders);
        return regions;
    }

    addTotalPalletsToLugsSummary(regions: IPnPRegions[], pallets: IPalletPickedDetails[]): IPnPRegions[] {
        for (let pallet = 0; pallet < pallets.length; pallet++) {
            for (let region = 0; region < regions.length; region++) {
                if (pallets[pallet].palletid === regions[region].regionid) {
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
