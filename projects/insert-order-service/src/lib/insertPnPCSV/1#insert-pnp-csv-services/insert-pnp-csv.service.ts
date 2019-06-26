import { Injectable } from '@angular/core';
import { IPnPCSVData, IPnPCSVFormat, IPnPCSVGroupedData, IOrderDetails } from '../../#sharedServices/insert-order-service-Interfaces';
import { ConvertPnpCsvDataFactoryService } from './convert-pnp-csv-data-factory.service';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { ConvertPnpStructureToOrdersService } from './convert-pnp-structure-to-orders.service';
import { InsertOrderService } from '../../#sharedServices/insert-order.service';

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
        for (let i = 1; i < lines.length - 1; i++) {   // Make sure this '-1' is correct
            const obj: IPnPCSVFormat = {};
            const currentline = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(this.convertPnPCVDataFactoryService.factoryConvertPnPRawData(obj));
        }
        return result;
    }

    loadHandler(event) {
        const groupByVendor: IPnPCSVGroupedData[] = [];
        const mrPnPOrders = [];
        const text = event.target.result;
        const pnpJSON = this.csvTOjson(text);
        const groupByRegion = this.toolBox.groupByArray(pnpJSON, 'vendorCode');
        for (let region = 0; region < groupByRegion.length; region++) {
            groupByVendor.push.apply(groupByVendor, this.toolBox.groupByArray(groupByRegion[region].values, 'storeCode'));
        }
        for (let vendor = 0; vendor < groupByVendor.length; vendor++) {
            mrPnPOrders.push(this.convertPnPStructureToOrderService.factoryConvertPnPDataToOrders(groupByVendor[vendor]));
        }
        // console.log(mrPnPOrders);
        // createPnPOrders(groupByVendor);
        return mrPnPOrders;
    }

    fileSelected(file) {
        let pnpOrders: IOrderDetails[] = {} as IOrderDetails[];
        const reader = new FileReader();
        reader.readAsText(file.target.files[0]);
        reader.onload = e => {
            pnpOrders = this.loadHandler(e);
            console.log('Alpha = ', pnpOrders);
            pnpOrders.forEach(order => {
                this.insertOrderService.insertNewOrder(order);
            });
        };
        // console.log('Alpha = ', pnpOrders);
        // return of(pnpOrders);
    }
}
