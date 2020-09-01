import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-table-headings',
  templateUrl: './dropdown-table-headings.component.html',
  styleUrls: ['./dropdown-table-headings.component.scss']
})
export class DropdownTableHeadingsComponent implements OnInit {

    @Input() headings;
    @Input() gridColmSizes;

  constructor() { }

  ngOnInit() {
  }

}
