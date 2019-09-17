import { Injectable } from '@angular/core';
import { IOrderDetails, IOrderDBDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { ConvertPnpCsvDataFactoryService } from './convert-pnp-csv-data-factory.service';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { ConvertPnpStructureToOrdersService } from './convert-pnp-structure-to-orders.service';
import { OrderService } from '../../#sharedServices/order.service';
import { Observable, from, of, interval } from 'rxjs';
import { take, concatMap, tap, map, mergeMap, switchMap, flatMap } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { DatePickerService } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker.service';
import { IPnPCSVData, IPnPCSVFormat } from '../../#sharedServices/interfaces/pnp-csv-interface';

@Injectable({
    providedIn: 'root'
})
export class InsertPnpCsvService {

    deliveryDaysChecked = {};

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
            of({}).pipe(
                map(() => this.removeUnqualifiedPnPOrders(pnpOrders)),
                concatMap((validPnPOrders) => from(validPnPOrders).pipe(
                    take(validPnPOrders.length),
                    concatMap(order => this.insertOrderTimeStampid(order).pipe(
                        concatMap(orderWithTimeStamp => this.insertOrderService.searchForOrder(
                            {id: orderWithTimeStamp.timeStampid}, orderWithTimeStamp.accountid)),
                        concatMap(result => {
                            if (this.checkIfReturningOrdersHasSameOrderNumber(result, order)) {
                                ordersNotInserted.push(order);
                                return of(' ---------- Order was already inserted ----------- ');
                            } else {
                                return this.insertOrderService.insertNewOrderAndProducts([order]);
                                // return of(' ---------- Order was NOT inserted ----------- ');
                            }
                        }),
                        tap(message => console.log(message)),
                        tap(() => this.insertOrderService.setOrdersNotInserted(ordersNotInserted)),
                    ))
                ))
            ).subscribe();
        };
    }

    removeUnqualifiedPnPOrders(pnpOrders: IOrderDetails[]): IOrderDetails[] {
        return pnpOrders.filter(order => order.accountid !== null);
    }

    checkIfReturningOrdersHasSameOrderNumber(returningOrder: IOrderDetails[], orderToInsert: IOrderDetails): boolean {
        // console.log(' ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ', returningOrder, orderToInsert);
        let flag = false;
        if (returningOrder) {
            returningOrder.forEach(order => {
                if (order.orderNumber === orderToInsert.orderNumber) {
                    flag = true;
                }
            });
        }
        return flag;
    }

    insertOrderTimeStampid(order: IOrderDetails): Observable<IOrderDetails> {
        if (order.deliveryDate in this.deliveryDaysChecked) {
            order.timeStampid = this.deliveryDaysChecked[order.deliveryDate];
            return of(order);
        } else {
            const longDate: Date = this.datePickerService.shortToLongDate(order.deliveryDate);
            return this.getDateService.getDatePackageForGivenLongDate(longDate).pipe(
                tap(datePackage => order.timeStampid = datePackage.id),
                tap(datePackage => this.deliveryDaysChecked[order.deliveryDate] = datePackage.id),
                map(() => order)
            );
        }

    }

    innerTest(obs): Observable<any> {
        const source2 = interval(500);
        return source2.pipe(
            take(4),
            tap(innerObs => console.log(obs, innerObs)),
        );
    }
}
