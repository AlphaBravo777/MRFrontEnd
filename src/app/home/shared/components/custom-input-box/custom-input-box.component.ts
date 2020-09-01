import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-custom-input-box',
  templateUrl: './custom-input-box.component.html',
  styleUrls: ['./custom-input-box.component.scss']
})
export class CustomInputBoxComponent implements OnInit, OnDestroy {

    private _value = new BehaviorSubject<string>('');
    subscription: Subscription;
    @Output() newAmount: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    set value(value) {
        this._value.next(value);
    }
    get value() {
        return this._value.getValue();
    }
    amountForm: FormGroup;
    showKeyboard: boolean;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.showKeyboard = this.isTouchDevice();
        this._value.subscribe(data => {
            this.buildForm(data);
        });
    }

    addRemoveUnderscore() {
        if (this.value[this.value.length - 1] === '_') {
            this.value = this.value.slice(0, -1);
        } else {
            this.value = this.value + '_';

        }
    }

    buildForm(value) {
        this.amountForm = this.fb.group({
            amount: value
        });
    }

    amountFormSubmit() {
        return;
    }

    keyPressed(key) {
        if (this.value[this.value.length - 1] === '_') {
            this.value = this.value.slice(0, -1);
        }
        if (key === 'del') {
            this.value = this.value.slice(0, -1);
        } else {
            this.value = this.value + key;
        }
        this.sendValue();
    }

    isTouchDevice() {
        if ('ontouchstart' in document.documentElement) {
            this.subscription = interval(500).subscribe(() => this.addRemoveUnderscore());
            return true;
        } else {
            return false;
        }
    }

    sendValue() {
        this.newAmount.emit(this.amountForm.controls.amount.value);
        // console.log('Emitted value from custom input container is: ', this.amountForm.controls.amount.value);
    }

    ngOnDestroy(): void {
        console.log('addRemoveUnderscore was destroyed');
        if (this.subscription) {
            this.subscription.unsubscribe();
           }
    }

}
