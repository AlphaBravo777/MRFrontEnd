import { Injectable, } from '@angular/core';
import { BehaviorSubject, combineLatest, of, Subscription } from 'rxjs';
import { ProcStockApiService } from './proc-stock-api.service';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { map, tap, switchMap, concatMap } from 'rxjs/operators';
import { IProcessedStock, IProcessedStockAmounts, IProcessedStockWithAmount } from './processed-stock';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';

@Injectable({
    providedIn: 'root'
})
export class ProcStockData$Service {

    private processedStock = new BehaviorSubject<IProcessedStock[]>([]);
    currentProcessedStock$ = this.processedStock.asObservable();
    private processedStockAmounts = new BehaviorSubject<IProcessedStockAmounts[]>([]);
    currentprocessedStockAmounts$ = this.processedStockAmounts.asObservable();
    private processedStockWithAmounts = new BehaviorSubject<IProcessedStockWithAmount[]>([]);
    currentprocessedStockWithAmounts$ = this.processedStockWithAmounts.asObservable();
    subscription: Subscription;

    constructor(private processedStockApi: ProcStockApiService,
        private toolbox: ToolboxGroupService,
        private dateService: GetDate$Service) {
        this.getInitialContainerAndAmountValues();
        console.log('*********** ProStockData$Service Running *******************');
    }

    getInitialContainerAndAmountValues() {
        const containersFirst$ = this.processedStockApi.getGraphQLProcContainers();
        const datePack$ = this.dateService.currentDatePackage$;
        const containers$ = this.currentProcessedStock$;
        const amounts$ = this.currentprocessedStockAmounts$;
        const combineContainersAndAmounts$ = combineLatest(containers$, amounts$);
        let timeHalfStock: boolean;

        this.subscription = containersFirst$.pipe(
            // tap(data => console.log('Step 1: ', data)),  // We are getting the container data
            tap(data => this.processedStock.next(data)),  // Here we are putting the data into the Observable
            switchMap(() => datePack$),    // We are getting the date package
            // tap(data => console.log('Step 2: ', data)),
            tap(data => timeHalfStock = data.timeHalfStock),
            // tap(() => this.clearHardDriveStockAndSetBackup()),
            switchMap(data => this.processedStockApi.getGraphQLDateAmounts(data.nodeID)),  // We get the amounts for the data package
            switchMap(data => {
                if (data.length === 0 && timeHalfStock === true) {
                    return this.processedStockApi.getGraphQLLatestAmountsPostedTimeStamp().pipe(
                        switchMap(data2 => this.processedStockApi.getGraphQLDateAmounts(data2)),
                        map(data2 => data2.filter(item => item.deleteAmount === false)),
                        tap(data2 => data2.map(item => {
                            const productIDs = {containerID: item.containerID , databaseID: item.databaseID};
                            this.addItemToLocalStorageList(productIDs, item.amount);
                            })
                        ),
                    );
                } else {
                    return of(data);
                }
            }),
            tap(data => console.log('Step 3 Alfa Data = ', data)),
            tap(data => this.processedStockAmounts.next(data)), // We put the amounts data into the amounts Observable
            switchMap(() => combineContainersAndAmounts$), // We get the latest amounts and containers data, and will update if one changes
            // tap(data => console.log('Step 4: ', data)),
            map(([data1, data2]) => this.toolbox.mergeTwoArrays(data1, data2, [])),  // We merge amounts into the containers
            // tap(data => console.log('Step 5: ', data)),
            map(data => this.processedStockWithAmounts.next(data)), // We put containers with amounts into the Observable

        ).subscribe();
    }

    recoverLocalStorageStockBackIntoTickets(data) {
        console.log('Data is inserted', data);
        this.processedStockAmounts.next(data);
    }

    changeProcStockContainerRankings(newRankingsArray: IProcessedStock[]) {
        console.log('Delta', newRankingsArray);
        this.processedStock.next(newRankingsArray);
    }

    // clearHardDriveStockAndSetBackup() {
    //     if (localStorage['procStockBackupData']) {
    //         localStorage.removeItem('procStockBackupData');
    //     }
    //     const a = JSON.parse(localStorage.getItem('procStockChangedItemsList'));
    //     localStorage.setItem('procStockBackupData', JSON.stringify(a));
    //     localStorage.removeItem('procStockChangedItemsList');
    // }

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

}
