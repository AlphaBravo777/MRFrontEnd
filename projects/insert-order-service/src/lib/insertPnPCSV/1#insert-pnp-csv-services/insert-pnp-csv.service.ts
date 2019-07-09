import { Injectable } from '@angular/core';
import { IPnPCSVData, IPnPCSVFormat, IOrderDetails } from '../../#sharedServices/insert-order-service-Interfaces';
import { ConvertPnpCsvDataFactoryService } from './convert-pnp-csv-data-factory.service';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { ConvertPnpStructureToOrdersService } from './convert-pnp-structure-to-orders.service';
import { InsertOrderService } from '../../#sharedServices/insert-order.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InsertPnpCsvService {

    constructor(private convertPnPCVDataFactoryService: ConvertPnpCsvDataFactoryService,
        private convertPnPStructureToOrderService: ConvertPnpStructureToOrdersService,
        private toolBox: ToolboxGroupService,
        private insertOrderService: InsertOrderService) {}

    csvTOjson(csv): IPnPCSVData[] {
        const lines = csv.split('\n');
        const result: IPnPCSVData[] = [];
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length - 1; i++) {
            const obj: IPnPCSVFormat = {};
            const currentline = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(this.convertPnPCVDataFactoryService.factoryConvertPnPRawData(obj));
        }
        return result;
    }

    loadHandler(event): IOrderDetails[] {
        const mrPnPOrders: IOrderDetails[] = [];
        const text = event.target.result;
        const pnpJSON = this.csvTOjson(text);
        const groupedOrders: Array<IPnPCSVData[]> = this.toolBox.multipleGroupByArray(pnpJSON,
            (item: IPnPCSVData) => [item.PONumber]);
        console.log('Here is the TEST function: ', groupedOrders);
        groupedOrders.forEach(vendor => {
            mrPnPOrders.push(this.convertPnPStructureToOrderService.factoryConvertPnPDataToOrders(vendor));
        });
        return mrPnPOrders;
    }

    fileSelected(file) {
        // let pnpOrders: IOrderDetails[] = {} a IOrderDetails[];
        const reader = new FileReader();
        reader.readAsText(file.target.files[0]);
        reader.onload = e => {
            const pnpOrders: IOrderDetails[] = this.loadHandler(e);
            console.log('Alpha = ', pnpOrders);
            this.insertOrderService.insertNewOrder(pnpOrders).pipe(
                take(pnpOrders.length)
            ).subscribe();
        };
    }

    insertOrders(orders): Observable<any> {
        orders.forEach(order => {
            this.insertOrderService.insertNewOrder(order);
            });
        return null;
    }

}

