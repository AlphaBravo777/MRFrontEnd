import { Component, OnInit, Input } from '@angular/core';

import { ProcessedStock } from './../../../stock-services/Stock';

@Component({
  selector: 'app-stock-products',
  templateUrl: './stock-products.component.html',
  styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit {

  @Input() products: ProcessedStock;

  constructor() { }

  ngOnInit() {
  }

}
