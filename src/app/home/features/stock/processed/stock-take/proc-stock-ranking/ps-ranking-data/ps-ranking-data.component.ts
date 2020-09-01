import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProcessedStock } from '../../proc-stock-services/processed-stock';
import { ProcStockData$Service } from '../../proc-stock-services/proc-stock-data$.service';
import { ProcStockApiService } from '../../proc-stock-services/proc-stock-api.service';
import { Subscription } from 'rxjs';
import { ProcStockService } from '../../proc-stock-services/proc-stock.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-ps-ranking-data',
    templateUrl: './ps-ranking-data.component.html',
    styleUrls: ['./ps-ranking-data.component.scss']
})
export class PsRankingDataComponent implements OnInit, OnDestroy {

    constructor(private procStockData$Service: ProcStockData$Service,
        private procStockApiService: ProcStockApiService,
        private procStockService: ProcStockService) {}

    containers: IProcessedStock[];
    filters = [];
    filteredList: IProcessedStock[] = [];
    filterName = '"Select Filter"';
    subscription: Subscription;
    subscription2: Subscription;

    ngOnInit() {
        // TODO: The data does not get updated correctly when you move one ticket from one array to another,
        // you first have to refresh all the data before the changes takes effect
        this.subscription = this.procStockData$Service.currentProcessedStock$.subscribe(data => {
            this.containers = data;
        });
        this.subscription2 = this.procStockApiService.getGraphQLFactoryAreas().subscribe(data => {
            this.filters = data.map(item => item.area);
            console.log('Filters = ', data);
        });
    }

    changeFilter(newFilter) {

        this.filterName = newFilter;
        this.filteredList = this.containers.filter((item) => item.factoryFilter === newFilter);
    }

    getNewList(newList: IProcessedStock[]) {
        let rankingList = [...newList];
        let x = 1;
        rankingList = rankingList.map(item => {
            item.factoryRanking = x;
            x = x + 1;
            return item;
        });
        console.log('Bravo = ', rankingList);
        const data = {factoryCatagory: this.filterName, newList: newList};

        this.procStockService.submitNewRankings(data);
    }

    ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    }


}
