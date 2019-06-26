import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IOrderDetails, IOrderDBDetails, factoryFunctionDBLayerCreateNewOrder } from './insert-order-service-Interfaces';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsertOrderApiService {

  constructor(private urlService: UrlsService, private http: HttpClient) { }

  private stockUrl = this.urlService.backendUrl + 'office/';

  enterNewOrderDetails(newOrderDetails: IOrderDetails) {
      const dbOrderDetails: IOrderDBDetails = factoryFunctionDBLayerCreateNewOrder(newOrderDetails);
    //   return of({id: 123});
      return this.http.post<any>(this.stockUrl + 'orders/enterDetails/', dbOrderDetails);
  }

  enterProductAmounts(productAmounts) {
      console.log('The inserted product amounts are', productAmounts);
    //   return of('Inserted correctly');
      return this.http.post<any>(this.stockUrl + 'orders/enterProductAmounts/', productAmounts);
  }
}
