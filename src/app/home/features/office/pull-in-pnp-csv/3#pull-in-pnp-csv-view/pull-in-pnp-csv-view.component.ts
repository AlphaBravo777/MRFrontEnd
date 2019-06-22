import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pull-in-pnp-csv-view',
  templateUrl: './pull-in-pnp-csv-view.component.html',
  styleUrls: ['./pull-in-pnp-csv-view.component.css']
})
export class PullInPnpCsvViewComponent implements OnInit {

    @Output() fileSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
