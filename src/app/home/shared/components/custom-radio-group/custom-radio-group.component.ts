import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-custom-radio-group',
  templateUrl: './custom-radio-group.component.html',
  styleUrls: ['./custom-radio-group.component.scss']
})
export class CustomRadioGroupComponent implements OnInit {

    @Input() buttons;
    @Output() buttonPicked: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    public buttonPick(filter): void {
        this.buttonPicked.emit(filter);
    }

}
