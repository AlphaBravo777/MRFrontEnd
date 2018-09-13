import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raw-material-data',
  templateUrl: './raw-material-data.component.html',
  styleUrls: ['./raw-material-data.component.css']
})
export class RawMaterialDataComponent implements OnInit {

    rawMaterialProductData;

  constructor() { }

  ngOnInit() {
      this.rawMaterialProductData = {};
  }

}
