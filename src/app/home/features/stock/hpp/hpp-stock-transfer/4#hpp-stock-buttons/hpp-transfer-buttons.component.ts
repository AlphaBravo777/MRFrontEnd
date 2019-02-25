import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-hpp-transfer-buttons',
  templateUrl: './hpp-transfer-buttons.component.html',
  styleUrls: ['./hpp-transfer-buttons.component.scss']
})
export class HppTransferButtonsComponent implements OnInit {

    @Input() index;
    @Output() changeAmount: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
