import { Directive, Renderer2, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
    selector: '[mrInsertInputBoxFocus]'
})
export class InputBoxFocusDirective implements AfterViewInit {

    constructor(public elem: ElementRef, private renderer: Renderer2) {}

    private firstTime = true;

    ngAfterViewInit() {
        if (this.firstTime) {
            this.elem.nativeElement.children[0].focus();
            this.firstTime = false;
        }
    }
}
