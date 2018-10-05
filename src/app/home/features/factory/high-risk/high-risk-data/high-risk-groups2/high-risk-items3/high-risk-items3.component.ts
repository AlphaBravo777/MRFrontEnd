import { Component, OnInit, Input } from '@angular/core';
import { HighRiskDataService } from '../../../high-risk-services/high-risk-data.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { HighRiskApiService } from '../../../high-risk-services/high-risk-api.service';
import { DialogBoxService } from '../../../../../../core/dialog-box/dialog-box.service';


@Component({
    selector: 'app-high-risk-items3',
    templateUrl: './high-risk-items3.component.html',
    styleUrls: ['./high-risk-items3.component.css']
})
export class HighRiskItems3Component implements OnInit {

    constructor(private highriskapiservice: HighRiskApiService, private fb: FormBuilder, private dialogBoxService: DialogBoxService) { }

    @Input() prod;
    prodForm: FormGroup;
    containerForm: FormGroup;
    container = 'Container?';
    amount;

    ngOnInit() {
        this.buildProdForm();
        this.buildContainerForm();
    }

    buildProdForm() {
        this.prodForm = this.fb.group({
            amount: this.amount
        });
    }

    buildContainerForm() {
        this.containerForm = this.fb.group({
            container: this.container
        });
    }

    changeContainer(newContainer) {
        this.container = newContainer;
    }

    updateProdAmount(prodName, time) {
        if (this.prodForm.controls.amount.value === null || undefined || '') {
            this.dialogBoxService.popUpMessage('You must enter a value (Or "0")');
        } else if (this.container === 'Container?') {
            this.dialogBoxService.popUpMessage('You must pick a container first');
        } else {
        console.log(prodName, time, this.prodForm.controls.amount.value);
        const updateValue = {prodName: prodName, time: time, amount: this.prodForm.controls.amount.value, container: this.container};
        this.highriskapiservice.updateSingleProductAmount(updateValue).subscribe();
        }
    }

}
