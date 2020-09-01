import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-custom-keyboard',
    templateUrl: './custom-keyboard.component.html',
    styleUrls: ['./custom-keyboard.component.css']
})
export class CustomKeyboardComponent implements OnInit {

    @Output() keyPressed: EventEmitter<any> = new EventEmitter<any>();
    @Input() inputValue;

    constructor() { }

    ngOnInit() {
    }

    keyPress(key) {
        this.keyPressed.emit(key);
    }



}
