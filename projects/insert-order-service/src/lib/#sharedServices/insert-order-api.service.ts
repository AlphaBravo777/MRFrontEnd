import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IOrderDetails,
    IOrderDBDetails,
    ff_createOrderDetailsObjectForDB,
    ff_CreateOrderDetailsObjFromDBObj,
    IInserOrderErrors} from './interfaces/order-service-Interfaces';
import { Observable, of } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { Apollo, gql } from 'apollo-angular-boost';
import { map, take, tap, concatMap, catchError } from 'rxjs/operators';
import { IProductOrderDetails,
    ff_createProductDetailsObjectForDB,
    IProductOrderDBDetails } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { IOrderproductamountsmicroserviceSetNode } from './interfaces/order-backend-interfaces';
import { IViewRoutesData } from '../view-orders/1#view-order-services/view-order-interface';

@Injectable({
  providedIn: 'root'
})
export class InsertOrderApiService {



    constructor(private urlService: UrlsService, private http: HttpClient, private apollo: Apollo) { }

    // Enters the main order details
    enterNewOrderDetails(orderDetails: IOrderDetails): Observable<IOrderDetails> {
        const orderDetailsBackend: IOrderDBDetails = ff_createOrderDetailsObjectForDB(orderDetails);
        console.log('Backend object: ', orderDetailsBackend);
        return this.http.post<any>(this.urlService.insertNewOrderDetailsUrl, orderDetailsBackend).pipe(
            tap(response => console.log('This is the responce now', JSON.parse(JSON.stringify(response)))),
            map(response => ff_CreateOrderDetailsObjFromDBObj(response)),
            tap(response => console.log('This is the response now', response)),
            //  --------------  Kafka Implementation --------------------
            // concatMap(() => this.http.put<any>(this.urlService.insertKafkaNewOrderDetails, orderDetailsBackend))
      );
    }

    // Enter the products and all their amounts, after the order details were inserted
    enterProductAmounts(productAmounts: IProductOrderDetails[]): Observable<any> {
        const productDetailsBackend: IProductOrderDBDetails[] = [];
        productAmounts.forEach(product => productDetailsBackend.push(ff_createProductDetailsObjectForDB(product)));
        console.log('The products that will be inserted = ', productDetailsBackend);
    //   const productDetailsBackend: IProductOrderDBDetails[] = ff_createProductDetailsObjectForDB(productAmounts)
        return this.http.post<any>(this.urlService.insertProductAmounts, productDetailsBackend);
    }

    deleteProductFromOrder(amountid: number) {
        return this.http.delete<any>(this.urlService.deleteProduct + amountid);
    }

    deleteOrder(orderid: number) {
        return this.http.delete<any>(this.urlService.deleteOrder + orderid);
    }

    updateRouteDate(route: IViewRoutesData, currentDatePackage: IDate, newDatePackage: IDate): Observable<IInserOrderErrors> {
        const routeUpdateData = {routeid: route.routeid, currentTimeStampid: currentDatePackage.id, newTimeStampid: newDatePackage.id };
        console.log('Updating now', routeUpdateData);
        return this.http.put<IInserOrderErrors>(this.urlService.updateRouteDate, routeUpdateData);
    }




    // sendOrderDetailsToKafka(order: IOrderDetails): Observable<IOrderDetails> {
    //     return this.http.post<any>( this.urlService.sagaCoordinatorMS + 'testmodule/kafkaTestEndpoint/', order).pipe(
    //         tap(response => console.log('The kafka response = ', response)),
    //         map(() => order),
    //         catchError(error => {
    //             console.log('The error = ', error);
    //             return of(order);
    //         })
    //     );
    // }

}
