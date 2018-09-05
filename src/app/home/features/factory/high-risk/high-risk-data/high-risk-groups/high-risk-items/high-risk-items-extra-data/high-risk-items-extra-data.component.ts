import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-high-risk-items-extra-data',
  templateUrl: './high-risk-items-extra-data.component.html',
  styleUrls: ['./high-risk-items-extra-data.component.css']
})
export class HighRiskItemsExtraDataComponent implements OnInit {

  constructor() { }

  @Input() productData;

  ngOnInit() {
  }

}
