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
        const classyPack = this.getPackage(this.packaging);
        this.elemRef.nativeElement.classList.add(classyPack);
    }

    getClass(weight, packaging) {
        if (weight === '0.5') {
            return 'weight05';
        } else if (weight === '1') {
            return 'weight1';
        } else if (weight === '2' && packaging === 'Bag') {
            return 'weight2Bag';
        } else if (weight === '2') {
            return 'weight2Vac';
        } else if (weight === '5') {
            return 'weight5Bag';
        }
    }

    getPackage(packaging) {
        if (packaging === 'Box') {
            return 'packagingBox';
        } else if (packaging === 'Trolley') {
            return 'packagingTrolley';
        }
    }

}
