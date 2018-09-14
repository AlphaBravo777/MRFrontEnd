import { Component, OnInit, Input } from '@angular/core';
import { IRawMaterialStockItem } from '../../raw-material-services/RawMaterial';

@Component({
  selector: 'app-raw-material-view2',
  templateUrl: './raw-material-view2.component.html',
  styleUrls: ['./raw-material-view2.component.css']
})
export class RawMaterialView2Component implements OnInit {

  constructor() { }

  @Input() individualStockData: IRawMaterialStockItem;

  ngOnInit() {

  }

}
