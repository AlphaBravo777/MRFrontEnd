import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-raw-stock-take-form',
    templateUrl: './raw-stock-take-form.component.html',
    styleUrls: ['./raw-stock-take-form.component.scss']
})
export class RawStockTakeFormComponent implements OnInit {

    private _amount = new BehaviorSubject([]);
    @Output() newAmount: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    set amount(value) {
        this._amount.next(value);
    }
    get amount() {
        return this._amount.getValue();
    }
    amountForm: FormGroup;
    showKeyboard: boolean;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.showKeyboard = this.isTouchDevice();
        this._amount.subscribe(amount => {
            this.buildForm(amount);
        });
    }

    buildForm(amount) {
        this.amountForm = this.fb.group({
            amount: amount
        });
    }

    amountFormSubmit() {
        return;
    }

    keyPressed(key) {
        // if (this.amount) {
        //     this.amount = this.amount + key;
        // } else {
        //     this.amount = key;
        // }
        // console.log(this.amount);
        this.amount = key;
        console.log(key);
    }

    isTouchDevice() {
        if ('ontouchstart' in document.documentElement) {
            return true;
        } else {
            return false;
        }
    }

}
