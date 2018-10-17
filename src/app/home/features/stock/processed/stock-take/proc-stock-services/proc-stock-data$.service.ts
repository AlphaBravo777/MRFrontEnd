import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProcStockApiService } from './proc-stock-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcStockData$Service {

    private processedStock = new BehaviorSubject<any[]>([]);
    currentProcessedStock$ = this.processedStock.asObservable();

    constructor(private processedStockApi: ProcStockApiService) {
        this.getDBProcessedStock();

     }

    getDBProcessedStock(): void {
        this.processedStockApi.getGraphQLProcData('VGltZVN0YW1wVHlwZToy').subscribe(data => {
            console.log(data);
            this.processedStock.next(data);
        });
    }
}


// query{
// 	filterProcessedstockamounts(timeStampID:"VGltZVN0YW1wVHlwZToy"){
//     edges{
//       node{
//         prodName{
//           productid
//         }
//         amount
//       }
//     }
//   }
// }
