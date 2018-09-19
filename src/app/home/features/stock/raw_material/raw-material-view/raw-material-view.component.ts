import { Component, OnInit, Input } from '@angular/core';
import { IRawMaterialGroup, IRawMaterialStockItem } from '../raw-material-services/RawMaterial';

@Component({
  selector: 'app-raw-material-view',
  templateUrl: './raw-material-view.component.html',
  styleUrls: ['./raw-material-view.component.scss']
})
export class RawMaterialViewComponent implements OnInit {

    @Input() rawMaterialProductData: IRawMaterialGroup[];
    expandedIndex = false;
    text = 'Expand';

    constructor() { }

    ngOnInit() {
        console.log(this.rawMaterialProductData);
    }

    expandContract() {
        this.expandedIndex =  !this.expandedIndex;
        if (this.text === 'Expand') {
            this.text = 'Contract';
          } else {
            this.text = 'Expand';
          }
    }

    trackByamounts(index: number, stock: IRawMaterialGroup): string {
        return stock.key;
    }

}
