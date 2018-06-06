import { Component, OnInit } from '@angular/core';

import { ProcessedStock } from './../../stock-services/Stock';
import { StockTakingService } from './../../stock-services/stock-taking.service';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {

  constructor(private _stockTakingService: StockTakingService) { }

  products: ProcessedStock[];

  ngOnInit() {

    this._stockTakingService.getUsers()
    .subscribe(
      response =>  this.products = response,
      err => console.log(err)
    );

  /*
    this.processedStocks = [
      {
        brand: 'Shoprite',
        packaging: 'Vacuum',
        weight: 2,
        code: 'MV2'
      },
      {
        brand: 'Makro',
        packaging: 'Box',
        weight: 1,
        code: 'MV1'
      }
    ];
  }
*/

  }
}
