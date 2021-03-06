import { Injectable } from '@angular/core';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { ConvertPnpCsvDataFactoryService } from './convert-pnp-csv-data-factory.service';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { ConvertPnpStructureToOrdersService } from './convert-pnp-structure-to-orders.service';
import { OrderService } from '../../#sharedServices/order.service';
import { Observable, from, of, interval } from 'rxjs';
import { take, concatMap, tap, map } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { DatePickerService } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker.service';
import { IPnPCSVData, IPnPCSVFormat } from '../../#sharedServices/interfaces/pnp-csv-interface';
import { IProductOrderDetails } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { datePackage_factory } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Injectable({
    providedIn: 'root'
})
export class InsertPnpCsvService {

    deliveryDaysChecked = {};
    unknownProducts: IProductOrderDetails[] = [];

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
            const orderAndUnknownProducts: [IOrderDetails, IProductOrderDetails[]] =
            this.convertPnPStructureToOrderService.factoryConvertPnPDataToOrders(vendor);
            mrPnPOrders.push(orderAndUnknownProducts[0]);
            this.unknownProducts.push.apply(this.unknownProducts, orderAndUnknownProducts[1]);
        });
        return mrPnPOrders;
    }

    fileSelected(file) {
        const ordersNotInserted: IOrderDetails[] = [];
        const ordersInserted: IOrderDetails[] = [];
        const reader = new FileReader();
        const datePackage = datePackage_factory();
        reader.readAsText(file.target.files[0]);
        reader.onload = e => {
            const pnpOrders: IOrderDetails[] = this.loadHandler(e);
            of({}).pipe(
                map(() => this.removeUnqualifiedPnPOrders(pnpOrders)),
                concatMap((validPnPOrders) => from(validPnPOrders).pipe(
                    take(validPnPOrders.length),
                    concatMap(order => this.insertOrderTimeStampid(order).pipe(
                        tap(orderWithTimeStamp => datePackage.id = orderWithTimeStamp.timeStampid),
                        concatMap(orderWithTimeStamp => this.insertOrderService.searchForOrder(
                            datePackage, orderWithTimeStamp.accountid)),
                        concatMap(result => {
                            if (this.checkIfReturningOrdersHasSameOrderNumber(result, order)) {
                                ordersNotInserted.push(order);
                                return of(' ---------- Order was already inserted ----------- ');
                            } else {
                                ordersInserted.push(order);
                                return this.insertOrderService.insertNewOrderAndProducts([order]);
                                // return of(' ---------- Order was NOT inserted ----------- ');
                            }
                        }),
                        tap(message => console.log(message)),
                        tap(() => this.insertOrderService.setOrdersNotInserted(ordersNotInserted)),
                        tap(() => this.insertOrderService.setOrdersInserted(ordersInserted)),
                        tap(() => this.insertOrderService.setUnknownProducts(this.unknownProducts)),
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
            const longDate: Date = this.datePickerService.convertShortDateToLongDate(order.deliveryDate);
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
