import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-is-data-available',
  templateUrl: './is-data-available.component.html',
  styleUrls: ['./is-data-available.component.scss']
})
export class IsDataAvailableComponent implements OnInit {

    @Input() data: Array<any> = [];
    @Input() noDataMessage = 'There is no data available';

    constructor() { }

    ngOnInit() {
    }

}
