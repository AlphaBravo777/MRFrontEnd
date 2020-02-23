import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';

export interface Testmain {
    basicInfo: string;
    address: string;
}


@Component({
    selector: 'mr-product-main-test',
    templateUrl: './main-test.component.html',
    styleUrls: ['./main-test.component.scss']
})
export class MainTestComponent implements OnInit {

    public nestedForm: FormGroup<Testmain> = new FormGroup<Testmain>({
        basicInfo: new FormControl(''),
        address: new FormControl('')
    });

    constructor() { }

    ngOnInit() {
    }

    public onSubmit() {
        console.log('Val: ', this.nestedForm.value);
    }

}
