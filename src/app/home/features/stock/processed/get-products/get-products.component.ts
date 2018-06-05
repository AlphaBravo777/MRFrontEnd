import { Component, OnInit } from '@angular/core';

import { ProcessedStock } from './ProcessedStock';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {

  constructor() { }

  processedStocks: ProcessedStock[];

  ngOnInit() {
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

}
