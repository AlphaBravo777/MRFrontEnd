import { Component, OnInit, Input } from '@angular/core';
import { IRawMaterialGroup, IRawMaterialStockItem } from '../raw-material-services/RawMaterial';

@Component({
  selector: 'app-raw-material-view',
  templateUrl: './raw-material-view.component.html',
  styleUrls: ['./raw-material-view.component.css']
})
export class RawMaterialViewComponent implements OnInit {

    @Input() rawMaterialProductData: IRawMaterialGroup[];

    constructor() { }

    ngOnInit() {
        console.log(this.rawMaterialProductData);
    }

    trackByamounts(index: number, stock: IRawMaterialGroup): string {
        return stock.key;
    }

}
