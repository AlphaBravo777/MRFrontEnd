import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { StockCreateGraphqlStringService } from './stock-create-graphql-string.service';
import { IStockTakeInstance } from '../../#shared-services/production-stock.interface';

@Injectable({
    providedIn: 'root'
})
export class StockCreateGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private stockCreateGraphqlStringService: StockCreateGraphqlStringService,
        private toolbox: ToolboxGroupService
    ) { }

    getLastFewStockTakes(count: number): Observable<IStockTakeInstance[]> {
        return this.apollo
            .watchQuery<any>({
                variables: { count },
                query: this.stockCreateGraphqlStringService.GET_LAST_10_STOCK_TAKES
            })
            .valueChanges.pipe(
                map(result => this.consolidateLastFewStockTakes(this.toolbox.refractureGraphqlRawData(result)['nodeStockTakeInstance']))
            );
    }

    private consolidateLastFewStockTakes(stockTakeInstancesData): IStockTakeInstance[] {
        console.table('consolidateLastFewStockTakes: ', stockTakeInstancesData)
        const stockTakeInstancesArray: IStockTakeInstance[] = [];

        const parentid = (parent) => {
            if (parent) {
                return parent.rowid
            } else
            return 'None'
        }

        for (let index = 0; index < stockTakeInstancesData.length; index++) {
            const instance = stockTakeInstancesData[index];
            const stockTakeInstance: IStockTakeInstance = {
                id: instance.rowid,
                ID: instance.id,
                stockTakerName: instance.stockTakerName,
                isFullStockTake: instance.isFullStockTake,
                stockTakeLocked: instance.stockTakeLocked,
                timeStampid: instance.timeStampid,
                parentStockTake: parentid(instance.parentStockTake),
                userid: instance.useridNode.rowid,
                username: instance.useridNode.firstName,
                stockTakeTime: instance.timeStampNode.time.times,
                year: instance.timeStampNode.year,
                weekNumber: instance.timeStampNode.week,
                dayNumber: instance.timeStampNode.weekDay.weekDayNumber,
                shortDate: instance.timeStampNode.shortDate
            }
            stockTakeInstancesArray.push(stockTakeInstance)
        }
        return stockTakeInstancesArray
    }

}
