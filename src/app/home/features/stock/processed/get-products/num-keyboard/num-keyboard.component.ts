import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-num-keyboard',
    templateUrl: './num-keyboard.component.html',
    styleUrls: ['./num-keyboard.component.css']
})
export class NumKeyboardComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    // keyboardClick(number) {
    //     const inputVar = '#inputNames' + this.arrayNumber;
    //     const val = this.amountForm.controls.amounting.value[this.arrayNumber];
    //     if (number !== 'minus') {
    //         this.amountForm.controls.amounting.value[this.arrayNumber] = val + number;
    //     } else {
    //         console.log('I should be subtrackting right now');
    //     }
    //     this.submitResult();
    //     this.changeProduct(this.productName);
    //     this.elRef.nativeElement.querySelector(inputVar).focus();
    //     console.log(this.amountForm.controls.amounting.value[this.arrayNumber], this.productName);
    // }

}
