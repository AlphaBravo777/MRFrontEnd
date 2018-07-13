import { Component, OnInit, Input, Output, EventEmitter, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { StockTakingService } from '../../../stock-services/stock-taking.service';

@Component({
    selector: 'app-ind-stock-prod',
    templateUrl: './ind-stock-prod.component.html',
    styleUrls: ['./ind-stock-prod.component.css']
})
export class IndStockProdComponent implements OnInit  {

    private _amounts = new BehaviorSubject([]);
    private amountForm: FormGroup;
    private total = 0;
    private arrayNumber: number;
    @Input() productName: string;
    @Input()
    set amounts(value) {
        this._amounts.next(value);
    }
    get products() {
        return this._amounts.getValue();
    }
    @Output() changeProductName: EventEmitter<any> = new EventEmitter<any>();

    constructor(private fb: FormBuilder, private _stockTakingService: StockTakingService, private elRef: ElementRef) {}

    ngOnInit() {
        this._amounts.subscribe(x => {
            this.buildAmountForm(x);
        });
    }

    buildAmountForm(x) {
        this.amountForm = this.fb.group({
            amounting: this.fb.array(x),
        });
    }

    submitResult() {
        let a = this.amountForm.controls.amounting.value;
        a = this.removeZeros(a);
        const key = this.productName;
        if (localStorage['stock']) {
            const JSObject = JSON.parse(localStorage.getItem('stock'));
            const b = a.toString();
            JSObject[key] = b;
            localStorage.setItem('stock', JSON.stringify(JSObject));
        }
    //    this.changeProduct('Select next product');
    }

    addAmount() {
        // console.log(this.productName);
        const control = <FormArray>this.amountForm.controls['amounting'];
        control.push(this.initItemRows());
        // console.log(this.amountForm.controls.amounting.value);
    }

    removeZeros(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] === '0' || array[i] === '' ) {
               array.splice(i, 1);
            }
        }
        return array;
    }

    initItemRows() {
        return this.fb.control('');
    }

    calculateTotal() {
        let val;
        this.total = 0;
        const a = this.amountForm.controls.amounting.value;
        for (val of a) {
            console.log(Function('"use strict"; return (' + val + ')')());
            this.total = this.total + Function('"use strict"; return (' + val + ')')();
        }
    }

    public changeProduct(name: any): void { // Clears the window
        this.changeProductName.emit(name);
    }

    keyboardSetup(arrayNumber) {
        this.arrayNumber = arrayNumber;
    }

    keyboardClick(number) {
        const inputVar = '#inputNames' + this.arrayNumber;
        const val = this.amountForm.controls.amounting.value[this.arrayNumber];
        if (number !== 'minus') {
            this.amountForm.controls.amounting.value[this.arrayNumber] = val + number;
        } else {
            console.log('I should be subtrackting right now');
        }
        this.submitResult();
        this.changeProduct(this.productName);
        this.elRef.nativeElement.querySelector(inputVar).focus();
        console.log(this.amountForm.controls.amounting.value[this.arrayNumber], this.productName);
    }
}


// "RV1":"3*4,5,20,10*7,10"
//        3*4,5,20,10*7,10
// "RV1":["3*4","5","20","10*7","10"]
