import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appStockGroup]'
})
export class StockGroupDirective implements AfterViewInit {

    constructor(public elemRef: ElementRef) { }

    @Input() stockGroup: string;

    ngAfterViewInit(): void {
        const classy = this.getClass(this.stockGroup);
        this.elemRef.nativeElement.classList.add(classy);

    }

    getClass(stockGroup) {
        if (stockGroup === 'Beef Griller') {
            return 'stockGroupBG';
        } else if (stockGroup === 'Chicken Polony') {
            return 'stockGroupCP';
        } else if (stockGroup === 'Chicken Vienna') {
            return 'stockGroupCV';
        } else if (stockGroup === 'Chilli Griller') {
            return 'stockGroupCHG';
        } else if (stockGroup === 'Combos') {
            return 'stockGroupCMB';
        } else if (stockGroup === 'French Polony') {
            return 'stockGroupFP';
        } else if (stockGroup === 'Hampers') {
            return 'stockGroupHMP';
        } else if (stockGroup === 'PnP Deli') {
            return 'stockGroupPNPD';
        } else if (stockGroup === 'PnP No Name') {
            return 'stockGroupPNPNN';
        } else if (stockGroup === 'PnP Polony') {
            return 'stockGroupPNPPol';
        } else if (stockGroup === 'PnP Premium') {
            return 'stockGroupPre';
        } else if (stockGroup === 'Red Vienna') {
            return 'stockGroupRV';
        } else if (stockGroup === 'Russian') {
            return 'stockGroupER';
        } else if (stockGroup === 'Smoke Vienna') {
            return 'stockGroupSV';
        } else if (stockGroup === 'Smoked Griller') {
            return 'stockGroupSG';
        } else if (stockGroup === 'Smokie') {
            return 'stockGroupSS';
        }
    }

}
