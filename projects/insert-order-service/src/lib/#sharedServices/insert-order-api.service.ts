import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IOrderDetails, IOrderDBDetails, factoryFunctionDBLayerCreateNewOrder } from './insert-order-service-Interfaces';

@Injectable({
  providedIn: 'root'
})
export class InsertOrderApiService {

  constructor(private urlService: UrlsService, private http: HttpClient) { }

  private stockUrl = this.urlService.backendUrl + 'office/';

  enterNewOrderDetails(newOrderDetails: IOrderDetails) {
      const dbOrderDetails: IOrderDBDetails = factoryFunctionDBLayerCreateNewOrder(newOrderDetails);
      return this.http.post<any>(this.stockUrl + 'orders/enterDetails/', dbOrderDetails);
  }

  enterProductAmounts(productAmounts) {
      return this.http.post<any>(
          this.stockUrl + 'orders/enterProductAmounts/',
          productAmounts
      );
  }
}
