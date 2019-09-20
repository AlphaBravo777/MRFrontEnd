import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';

@Component({
    selector: 'app-insert-order-view1',
    templateUrl: './insert-order-view1.component.html',
    styleUrls: ['./insert-order-view1.component.scss']
})
export class InsertOrderView1Component implements OnInit {

    @Input() orderForm: FormGroup;
    @Input() relevantAccountsArray: IAccountDetails[];
    @Input() productsToChooseFrom;
    @Output() searchAccounts: EventEmitter<any> = new EventEmitter<any>();
    @Output() accountSelection: EventEmitter<any> = new EventEmitter<any>();
    @Output() productSelection: EventEmitter<any> = new EventEmitter<any>();
    @Output() orderFormSubmit: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('searchBox', {static: true}) searchBox: any;

    constructor() {}

    ngOnInit() {
        console.log(this.orderForm);
        fromEvent(this.searchBox.nativeElement, 'keyup').pipe(
            map((k: any) => k.target.value),
            debounceTime(500),
            tap((data) => this.searchAccounts.emit(data))
        ).subscribe();
    }

}
