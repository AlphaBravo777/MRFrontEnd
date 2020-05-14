import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { map, debounceTime, tap, take } from 'rxjs/operators';
import { FormArray, FormGroup, FormControl } from '@ng-stack/forms';
import { SmallStockTakeService } from '../services/small-stock-take.service';

class ISmallStockTake {
    itemid: number;
    description: string;
    barcode: number;
    quantity: number;
}

class ISmallStockTakeForm {
    smallStockTakeArray: ISmallStockTake[];
}

@Component({
    selector: 'mr-product-small-stock-take',
    templateUrl: './small-stock-take.component.html',
    styleUrls: ['./small-stock-take.component.scss']
})
export class SmallStockTakeComponent implements OnInit, OnDestroy {

    @ViewChild('input1') focus1: ElementRef;
    changingBarcodeValue: FormControl = new FormControl(null);
    recordIndex = 0;
    subscription: Subscription;
    public stockTakeForm: FormGroup<ISmallStockTakeForm> = new FormGroup<ISmallStockTakeForm>({
        smallStockTakeArray: new FormArray<ISmallStockTake>([])
    });

    constructor(private renderer: Renderer2, private smallStockTakeService: SmallStockTakeService) { }

    ngOnInit() {
        this.checkIfDataExists();
        this.addEmptyRecord();
        console.log('stocktakeForm = ', this.stockTakeForm.value);
        this.checkBarcodeData();
    }

    checkIfDataExists() {
        if (localStorage['butcheryStocktake']) {
            const existingData: ISmallStockTake[] = JSON.parse(localStorage.getItem('butcheryStocktake'));
            for (let index = 0; index < existingData.length; index++) {
                const element = existingData[index];
                if (element.barcode !== null) {
                    this.addEmptyRecord();
                    this.stockTakeForm.get('smallStockTakeArray').controls[index].get('barcode').setValue(element.barcode);
                    this.stockTakeForm.get('smallStockTakeArray').controls[index].get('quantity').setValue(element.quantity);
                    this.stockTakeForm.get('smallStockTakeArray').controls[index].get('itemid').setValue(element.itemid);
                    console.log('local = ', element);
                }
            }
            console.log('There is a localstorage stocktake available');
        } else {
            this.addArrayToLocalStorage([]);
            console.log('There is no localstorage stocktake available');
        }
    }

    addArrayToLocalStorage(data: Array<ISmallStockTake>) {
        localStorage.setItem('butcheryStocktake', JSON.stringify(data));
    }

    emptyStockRecord(): FormGroup<ISmallStockTake> {
        const stockRecord: FormGroup<ISmallStockTake> = new FormGroup<ISmallStockTake>({
            itemid: new FormControl(null),
            description: new FormControl(''),
            barcode: new FormControl(null),
            quantity: new FormControl(null),
        });
        return stockRecord;
    }

    addEmptyRecord() {
        this.stockTakeForm.get('smallStockTakeArray').push(this.emptyStockRecord());
    }

    inputBoxValueChanged(index) {
        this.recordIndex = index;
        this.changingBarcodeValue.setValue(this.stockTakeForm.get('smallStockTakeArray').controls[this.recordIndex].get('barcode').value);

    }

    checkBarcodeData() {
        this.subscription = this.changingBarcodeValue.valueChanges.pipe(
            debounceTime(50),
            tap(() => {
                if (this.changingBarcodeValue.value) {
                    this.searchData(this.changingBarcodeValue.value);
                } else {
                    console.log('No value');
                }
            }),
            ).subscribe();
    }

    searchData(data) {
        console.log('Value = ', this.recordIndex, data);
        if (data === null) {
            return;
        }

        if (parseInt(data[0], 10) === 2) {
            console.log('You have scanned a butchery item: ', data);
            this.stockTakeForm.get('smallStockTakeArray').push(this.emptyStockRecord());
            const root = this.renderer.selectRootElement(this.focus1);
            const nextRecord = root.nativeElement.children;
            console.log('Renderer = ', nextRecord.length);
            this.stockTakeForm.get('smallStockTakeArray').controls[this.recordIndex].get('quantity').setValue(data.substring(6, 12));
            this.stockTakeForm.get('smallStockTakeArray').controls[this.recordIndex].get('itemid').setValue(data.substring(2, 6));
            // console.log('Parent = ', this.focus1.nativeElement.children, this.recordIndex);
            // console.log('Elements = ', this.focus1.nativeElement.children[0].children);
            // this.focus1.nativeElement.children[index + 1].children[0].focus();
        } else {
            this.stockTakeForm.get('smallStockTakeArray').controls[this.recordIndex].get('itemid').setValue(data);
            console.log('Standard item scanned: ', data, this.recordIndex);
        }
        // Added current data to localStorage
        this.addArrayToLocalStorage(this.stockTakeForm.get('smallStockTakeArray').value);


    }

    butcheryItem() {
        this.stockTakeForm.get('smallStockTakeArray').push(this.emptyStockRecord());
        // this.changingBarcodeValue.setValue(this.stockTakeForm.get('smallStockTakeArray').controls[index + 1].get('barcode').focus());
    }

    check() {
        // console.log('Sub = ', this.subscription);
        // console.log('Element = ', this.focus1.nativeElement.children);
        this.focus1.nativeElement.focus();
    }

    createAndSendFiles(data: ISmallStockTake[]) {
        const date = new Date();
        const newDate = date.toLocaleDateString();
        const timestamp = Math.floor(Date.now() / 1000);
        const dataIntoArray = [];
        dataIntoArray.push(['itemid', 'barcode', 'quantity', 'description']);
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (element.itemid === null) {
                continue;
            }
            dataIntoArray.push([element.itemid, element.barcode, element.quantity, element.description]);
        }
        console.log(dataIntoArray, newDate);
        this.smallStockTakeService.exportToCsv(newDate + ' ' + timestamp + ' - Individual.csv', dataIntoArray);
        // this.smallStockTakeService.exportToCsv(newDate + ' - Grouped.csv', data);
    }

    submit() {
        // console.log('We will be submitting now', this.stockTakeForm.get('smallStockTakeArray').value);
        this.createAndSendFiles(this.stockTakeForm.get('smallStockTakeArray').value);
        localStorage.removeItem('butcheryStocktake');
        // this.ngOnInit();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
