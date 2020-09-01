import { Injectable } from '@angular/core';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { IProcessedStockGroup, IProcessedStockWithAmount, IProcessedStock } from './processed-stock';
import { ProcStockData$Service } from './proc-stock-data$.service';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { ProcStockApiService } from './proc-stock-api.service';

@Injectable({
    providedIn: 'root'
})
export class ProcStockService {

    constructor(private toolbox: ToolboxGroupService,
        private procStockData$Service: ProcStockData$Service,
        private getDate$Service: GetDate$Service,
        private procStockApiService: ProcStockApiService) { }

    addFactoryGroupAndFilters(data: IProcessedStockWithAmount[]): IProcessedStockGroup[] {

        // tslint:disable-next-line
        let allProductsAsOneGroup: IProcessedStockGroup[] = [{ key: 'Whole Factory Stock', values: this.toolbox.sorting(data, 'factoryFilterRating') }]
        allProductsAsOneGroup = this.createFilterFields(allProductsAsOneGroup, 'factoryFilter');
        let productGroups: IProcessedStockGroup[] = this.toolbox.groupByArray(data, 'batchgroup');
        productGroups = this.createFilterFields(productGroups, 'filter');
        productGroups.unshift(allProductsAsOneGroup[0]);
        return productGroups;
    }

    createFilterFields(groupedData, field) {
        for (let num = 0; num < groupedData.length; ++num) {
            const uniqueFilters = Array.from(new Set(groupedData[num].values.map((item: any) => item[field])));
            groupedData[num].filters = uniqueFilters;
        }
        return groupedData;
    }

    changeSingleStockAmount(productIDs, amount) {
        const subscription = this.procStockData$Service.currentprocessedStockWithAmounts$.subscribe(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].containerID === productIDs.containerID) {
                    amount = this.toolbox.changeEquationToNumber(amount);
                    data[i].amount = amount;
                    this.addItemToLocalStorageList(productIDs, amount);
                    break;
                }
            }
        });
        subscription.unsubscribe();
    }

    addItemToLocalStorageList(productIDs, amount) {
        if (!localStorage['procStockChangedItemsList']) {
            const procStockChangedItemsList = [{ containerID: productIDs.containerID, databaseID: productIDs.databaseID, amount: amount }];
            localStorage.setItem('procStockChangedItemsList', JSON.stringify(procStockChangedItemsList));
        } else {
            const procStockChangedItemsList = JSON.parse(localStorage.getItem('procStockChangedItemsList'));
            if (procStockChangedItemsList.some(e => e.containerID === productIDs.containerID)) {
                procStockChangedItemsList.map(e => {
                    if (e.containerID === productIDs.containerID) {
                        e.amount = amount;
                        localStorage.setItem('procStockChangedItemsList', JSON.stringify(procStockChangedItemsList));
                    }
                });
            } else {
                procStockChangedItemsList.push({ containerID: productIDs.containerID, databaseID: productIDs.databaseID, amount: amount });
                localStorage.setItem('procStockChangedItemsList', JSON.stringify(procStockChangedItemsList));
            }
        }
    }

    updateLocalStorageStockToDB() {
        if (localStorage.getItem('procStockChangedItemsList')) {
            this.getDate$Service.currentDatePackage$.pipe(
                take(1)
            ).subscribe(data => {
                const procStockChangedItemsList = JSON.parse(localStorage.getItem('procStockChangedItemsList'));
                const timeAndData = {timeid: data.id, timeID: data.nodeID, data: procStockChangedItemsList};
                this.procStockApiService.enterAllProcessedProductsIntoDB(timeAndData).subscribe(response => {
                    if (response) {
                        localStorage.removeItem('procStockChangedItemsList');
                    } else {
                        console.log('Processed stock did not update correctly');
                    }
                });
            });
        }
    }

    submitTicketStockToDB() {
        let stockWithAmounts;
        let datePackage;
        let timeAndData;
        // TODO: This whole thing can be changed with a forkjoin where you run the two observables that are needed at the same time
        this.getDate$Service.currentDatePackage$.pipe(
            take(1),
            tap(data => datePackage = data),
            switchMap(() => this.procStockData$Service.currentprocessedStockWithAmounts$),
            map(data => {
                stockWithAmounts = data.filter(item => item.amount > 0).map(item => {
                    return {containerID: item.containerID, databaseID: item.databaseID, amount: item.amount};
                });
            }),
            tap(() => timeAndData = {timeid: datePackage.id, timeID: datePackage.nodeID, data: stockWithAmounts}),
            switchMap(() => this.procStockApiService.enterAllProcessedProductsIntoDB(timeAndData)),
            tap(data => {
                    if (data) {
                        localStorage.removeItem('procStockChangedItemsList');
                    }
                })
            ).subscribe();
    }

    recoverLocalStorageStockBackIntoTickets() {
        const recoverData = JSON.parse(localStorage.getItem('procStockChangedItemsList'));
        this.procStockData$Service.recoverLocalStorageStockBackIntoTickets(recoverData);
    }

    submitNewRankings(rankingData) {
        this.procStockApiService.enterNewContainerRankingsIntoDB(rankingData).subscribe();
        console.log(rankingData);
        this.procStockData$Service.currentProcessedStock$.pipe(take(1)).subscribe(data => {
            const newArray: IProcessedStock[] = data.map(dataItem => {
                rankingData['newList'].map(rankItem => {
                    if (dataItem.containerID === rankItem.containerID) {
                        // console.log(rankItem.productid, rankItem.factoryRanking);
                        dataItem.factoryRanking = rankItem.factoryRanking;
                        dataItem.factoryFilter = rankingData['factoryCatagory'];
                        // console.log(dataItem.factoryRanking, rankItem.factoryFilter);
                        return dataItem;
                    } else {
                        return dataItem;
                    }
                });
                return dataItem;
            });
            console.log('The new array that should contain all the changed values ', newArray);
            // tslint:disable-next-line
            this.procStockData$Service.changeProcStockContainerRankings(this.toolbox.multiFieldSorting(newArray, ['factoryFilterRating', 'factoryRanking']));
        });
    }


}
