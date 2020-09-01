import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnDestroy  } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ProcessedStockService } from '../../../stock-services/processed-stock.service';

@Component({
    selector: 'app-ind-stock-prod',
    templateUrl: './ind-stock-prod.component.html',
    styleUrls: ['./ind-stock-prod.component.css']
})
export class IndStockProdComponent implements OnInit, OnDestroy  {

    constructor(private fb: FormBuilder,
        private elRef: ElementRef,
        private processedStockService: ProcessedStockService) {}

    private _amounts = new BehaviorSubject([]);
    private amountForm: FormGroup;
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

    ngOnInit() {
        this._amounts.subscribe(amounts => {
            this.buildAmountForm(amounts);
        });
    }

    buildAmountForm(amounts) {
        this.amountForm = this.fb.group({
            amounting: this.fb.array(amounts),
        });
    }

    submitResult() {
        this.processedStockService.submitResult(this.amountForm.controls.amounting.value, this.productName);
    }

    addAmount() {
        const control = <FormArray>this.amountForm.controls['amounting'];
        control.push(this.initItemRows());
    }

    initItemRows() {
        return this.fb.control('');
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

    ngOnDestroy(): void {
        this._amounts.unsubscribe();
    }
}


// "RV1":"3*4,5,20,10*7,10"
//        3*4,5,20,10*7,10
// "RV1":["3*4","5","20","10*7","10"]
