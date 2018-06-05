import { Component, OnInit, Input } from '@angular/core';

import { ProcessedStock } from '../../get-products/processedStock';

@Component({
  selector: 'app-stock-products',
  templateUrl: './stock-products.component.html',
  styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit {

  @Input() processedStocks: ProcessedStock;

  constructor() { }

  ngOnInit() {
  }

}
