import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-high-risk-items',
  templateUrl: './high-risk-items.component.html',
  styleUrls: ['./high-risk-items.component.css']
})
export class HighRiskItemsComponent implements OnInit {

    // If you exclude names in the below array, even if you have colmns for them in the template, they will not be rendered
    displayedColumns: string[] = ['productCode', 'description', 'currentStock', 'stockNeeded' ];

    @Input() individualGroupStocks;
    @Input() individualGroupName;
    @Input() singleGroupData;

  constructor() { }

  ngOnInit() {
  }

}
