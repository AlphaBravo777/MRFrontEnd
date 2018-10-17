import { Component, OnInit } from '@angular/core';
import { ProcessedStockData$Service } from '../../../../../shared/services/stockServices/processed-stock-data.service';
import { ProcStockData$Service } from '../proc-stock-services/proc-stock-data$.service';

@Component({
    selector: 'app-proc-stock-take-data',
    templateUrl: './proc-stock-take-data.component.html',
    styleUrls: ['./proc-stock-take-data.component.scss']
})
export class ProcStockTakeDataComponent implements OnInit {

    constructor(private procStockData$Service: ProcStockData$Service) { }

    // tslint:disable-next-line
    singleProduct = { id: 1, prodCode: 'SV1', batchName: 'SV', brand: 'vencor', packaging: 'Vacuum', unitWeight: 1, description: 'Vencor SV 1kg Vacuum', batchColor: '#d9ecff' };

    ngOnInit() {
        this.procStockData$Service.currentProcessedStock$.subscribe(data => {
            console.log('Here is the procStock$data ', data);
        });
    }



}

// query{
//     timeStampFilter(id:2){
//       processedstockamountsSet{
//         edges{
//           node{
//             prodName{
//               id
//               productid
//               proddescription
//                           unitweight{
//                 unitAmount
//                 measuringUnit
//                 unitColor{
//                   colorCode
//                 }
//               }
//               productcontainersSet{
//                 containernameid{
//                   containername
//                 }
//               }
//               batchgroup{
//                 batchname
//                 batchColor{
//                   colorCode
//                 }
//               }
//               brand{
//                 brand
//               }
//               packaging{
//                 packagingType
//               }
//             }
//             amount
//           }
//         }
//       }
//     }
//   }
