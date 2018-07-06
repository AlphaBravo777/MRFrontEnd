import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-ind-stock-prod',
    templateUrl: './ind-stock-prod.component.html',
    styleUrls: ['./ind-stock-prod.component.css']
})
export class IndStockProdComponent implements OnInit {

    private _amounts = new BehaviorSubject([]);
    private amountForm: FormGroup;
    total = 0;
    @Input() productName: string;
    @Input()
    set amounts(value) {
        this._amounts.next(value);
    }
    get products() {
        return this._amounts.getValue();
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this._amounts.subscribe(x => {
            this.buildAmountForm(x);
        });
        //
    }

    buildAmountForm(x) {
        this.amountForm = this.fb.group({
            amounting: this.fb.array(x),
        });
    }

    submitResult() {
        let val;
        this.total = 0;
        const a = this.amountForm.controls.amounting.value;
        for (val of a) {
            console.log(Function('"use strict"; return (' + val + ')')());
            this.total = this.total + Function('"use strict"; return (' + val + ')')();
        }
        const key = this.productName;
        const productt = {};
        productt[key] = a;
        if (localStorage['stock']) {
            const JSObject = JSON.parse(localStorage.getItem('stock'));
            if (key in JSObject) {
                const b = a.toString();
                JSObject[key] = b;
                localStorage.setItem('stock', JSON.stringify(JSObject));
            } else {
                const b = a.toString();
                JSObject[key] = b;
                localStorage.setItem('stock', JSON.stringify(JSObject));
            }
           }
        // localStorage.setItem('product', JSON.stringify(productt));
        // const producttt = localStorage.getItem('product');
        // console.log(producttt);

    }

    addAmount() {
        console.log(this.productName);
        const control = <FormArray>this.amountForm.controls['amounting'];
        control.push(this.initItemRows());
        console.log(this.amountForm.controls.amounting.value);
    }

    initItemRows() {
        return this.fb.control('');
    }

}


// "RV1":"3*4,5,20,10*7,10"
//        3*4,5,20,10*7,10
// "RV1":["3*4","5","20","10*7","10"]
