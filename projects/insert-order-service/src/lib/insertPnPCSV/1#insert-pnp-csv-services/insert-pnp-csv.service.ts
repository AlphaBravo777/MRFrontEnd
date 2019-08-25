import { Injectable } from '@angular/core';
import { IPnPCSVData, IPnPCSVFormat, IOrderDetails } from '../../#sharedServices/interfaces/insert-order-service-Interfaces';
import { ConvertPnpCsvDataFactoryService } from './convert-pnp-csv-data-factory.service';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { ConvertPnpStructureToOrdersService } from './convert-pnp-structure-to-orders.service';
import { OrderService } from '../../#sharedServices/order.service';
import { Observable, from, of } from 'rxjs';
import { take, concatMap, tap, map, mergeMap } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { DatePickerService } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker.service';

@Injectable({
    providedIn: 'root'
})
export class InsertPnpCsvService {

    constructor(private convertPnPCVDataFactoryService: ConvertPnpCsvDataFactoryService,
        private convertPnPStructureToOrderService: ConvertPnpStructureToOrdersService,
        private toolBox: ToolboxGroupService,
        private insertOrderService: OrderService,
        private getDateService: GetDate$Service,
        private datePickerService: DatePickerService) {}

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
        const ordersNotInserted: IOrderDetails[] = [];
        const reader = new FileReader();
        reader.readAsText(file.target.files[0]);
        reader.onload = e => {
            const pnpOrders: IOrderDetails[] = this.loadHandler(e);
            // console.log('Alpha = ', pnpOrders);
            from(pnpOrders).pipe(
                take(pnpOrders.length),
                concatMap(order => this.insertOrderTimeStampid(order)),
                tap(order => console.log('* * *', order)),
                mergeMap(order => this.insertOrderService.searchForOrder({id: order.timeStampid}, order.accountid).pipe(
                    take(1),
                    concatMap(result => {
                        if (result) {
                            ordersNotInserted.push(order);
                            return of('Order was already inserted');
                        } else {
                            return this.insertOrderService.insertNewOrder([order]);
                        }
                    })
                )),
                // tap(() => console.log('The order that was not inserted = ', ordersNotInserted)),
                tap(() => this.insertOrderService.setOrdersNotInserted(ordersNotInserted)),
            ).subscribe();
        };
    }

    insertOrderTimeStampid(order: IOrderDetails): Observable<IOrderDetails> {
        // console.log('# # #', order);
        const deliveryDaysChecked = {};
        if (order.deliveryDate in deliveryDaysChecked) {
            order.timeStampid = deliveryDaysChecked[order.deliveryDate];
            // console.log(' ---------- There was a timestamp id ----------- ');
            return of(order);
        } else {
            const longDate: Date = this.datePickerService.shortToLongDate(order.deliveryDate);
            return this.getDateService.getDatePackageForGivenLongDate(longDate).pipe(
                tap(datePackage => order.timeStampid = datePackage.id),
                tap(datePackage => deliveryDaysChecked[order.deliveryDate] = datePackage.id),
                map(() => order)
            );
        }

    }
}
