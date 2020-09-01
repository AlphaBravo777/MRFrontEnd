import { Directive, Renderer2, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Directive({
    selector: 'input[type=text]'
})
export class MyInputDirective implements AfterViewInit {

    constructor(public elem: ElementRef) {
    }

    private firstTime = true;

    ngAfterViewInit() {
      if (this.firstTime) {
        this.elem.nativeElement.focus();
        this.firstTime = false;
      }
    }
}
