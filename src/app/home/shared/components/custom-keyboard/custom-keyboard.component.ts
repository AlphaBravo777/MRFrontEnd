import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-custom-keyboard',
    templateUrl: './custom-keyboard.component.html',
    styleUrls: ['./custom-keyboard.component.css']
})
export class CustomKeyboardComponent implements OnInit, OnDestroy {

    @Output() keyPressed: EventEmitter<any> = new EventEmitter<any>();
    @Input() inputValue;
    subscription: Subscription;

    constructor() { }

    ngOnInit() {
    this.subscription = interval(500).subscribe(x => this.addRemoveUnderscore());
    }

    keyPress(key) {
        if (this.inputValue[this.inputValue.length - 1] === '_') {
            this.inputValue = this.inputValue.slice(0, -1);
        }
        if (key === 'del') {
            this.inputValue = this.inputValue.slice(0, -1);
        } else {
        this.inputValue = this.inputValue + key;
        }
        this.keyPressed.emit(this.inputValue);
    }

    addRemoveUnderscore() {
        if (this.inputValue[this.inputValue.length - 1] === '_') {
            this.inputValue = this.inputValue.slice(0, -1);
        } else {
            this.inputValue = this.inputValue + '_';

        }
        this.keyPressed.emit(this.inputValue);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
