import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[mrProductSmallStockFocus]'
})
export class SmallStockFocusDirective implements OnInit {

    constructor(private elementRef: ElementRef) { }

    el = this.elementRef.nativeElement;

    ngOnInit() {
        this.el.focus();
        // console.log('Test');
      }

}
