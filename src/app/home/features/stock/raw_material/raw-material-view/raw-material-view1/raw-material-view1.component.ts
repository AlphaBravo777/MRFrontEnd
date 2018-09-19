import { Component, OnInit, Input } from '@angular/core';
import { IRawMaterialGroup, IRawMaterialStockItem } from '../../raw-material-services/RawMaterial';

@Component({
  selector: 'app-raw-material-view1',
  templateUrl: './raw-material-view1.component.html',
  styleUrls: ['./raw-material-view1.component.scss']
})
export class RawMaterialView1Component implements OnInit {

  @Input() stockGroupData: IRawMaterialGroup;
  @Input() expandedIndex;

  constructor() { }

  ngOnInit() {
  }

  collaps() {
      this.expandedIndex = !this.expandedIndex;
  }

  trackByamounts(index: number, values: IRawMaterialStockItem): number {
    return values.amount;
}

}
