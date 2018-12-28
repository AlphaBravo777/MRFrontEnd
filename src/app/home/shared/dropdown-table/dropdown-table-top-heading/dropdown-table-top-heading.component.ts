import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-table-top-heading',
  templateUrl: './dropdown-table-top-heading.component.html',
  styleUrls: ['./dropdown-table-top-heading.component.scss']
})
export class DropdownTableTopHeadingComponent implements OnInit {

    @Input() viewHeading: string;
    @Input() buttonText: string;

  constructor() { }

  ngOnInit() {
  }

}
