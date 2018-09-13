import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-high-risk-items1',
  templateUrl: './high-risk-items1.component.html',
  styleUrls: ['./high-risk-items1.component.css']
})
export class HighRiskItems1Component implements OnInit {

    @Input() singleGroupData;

  constructor() { }

  ngOnInit() {
  }

}
