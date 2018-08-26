import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appButtonColor]'
})
export class ButtonColorDirective implements AfterViewInit {

    constructor(public elemRef: ElementRef) { }

    @Input() weight: string;
    @Input() packaging: string;

    ngAfterViewInit(): void {
        const classy = this.getClass(this.weight, this.packaging);
        this.elemRef.nativeElement.classList.add(classy);

    }

    getClass(weight, packaging) {
        if (weight === '0.5' && packaging === 'Vacuum') {
            return 'weight05';
        } else if (weight === '0.5' && packaging === 'Box') {
            return 'weight05Box';
        } else if (weight === '1' && packaging === 'Vacuum') {
            return 'weight1';
        } else if (weight === '1' && packaging === 'Box') {
            return 'weight1Box';
        } else if (weight === '2' && packaging === 'Vacuum') {
            return 'weight2Vac';
        } else if (weight === '2' && packaging === 'Box') {
            return 'weight2Box';
        } else if (weight === '2' && packaging === 'Bag') {
            return 'weight2Bag';
        } else if (weight === '5' && packaging === 'Bag') {
            return 'weight5Bag';
        } else if (packaging === 'Box') {
            return 'weightBox';
        } else if (packaging === 'Trolley') {
            return 'weightTrolley';
        }
    }

}
