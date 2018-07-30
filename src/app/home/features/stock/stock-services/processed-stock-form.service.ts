import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IProcessedStockContainer, IProcessedStockProducts } from './Stock';
import { container } from '../../../../../../node_modules/@angular/core/src/render3/instructions';

@Injectable({
    providedIn: 'root'
})
export class ProcessedStockFormService {

    constructor(private fb: FormBuilder) { }

    toFormGroup(data: IProcessedStockProducts) {
        // let group: any = {};
        // console.log('----------- ', data);

        // for (let i = 0; i < data.mainContainer.length; ++i) {
        //     group[i] = this.fb.group({
        //     productName: this.fb.control(data.mainContainer[i].container),
        //     amounts: this.fb.array(data.mainContainer[i].amount),
        //     });

        // }

        // data.mainContainer.forEach(x => {
        //     let i = 0;
        //     group[x.container] = this.fb.group({
        //             productName: this.fb.control(data.mainContainer[i].container),
        //             amounts: this.fb.array(data.mainContainer[i].amount),
        //             });
        //     i = i + 1;
        //   });


        // return new FormGroup(group);
    }

    //     containers.mainContainer.forEach(container => {
    //         group[container[0]] =
    //               new FormControl(container.value || '', Validators.required)
    //             : new FormControl(container.value || '');
    //     });
    //     return new FormGroup(group);
    // }


}


// private amountForm: FormGroup;

// ngOnInit() {
//     // console.log('+++ ', this.containerWithAmount.amount);
//     this.buildAmountForm(this.containerWithAmount.amount);
// }

// buildAmountForm(amounts) {
//     this.amountForm = this.fb.group({
//         amounting: this.fb.array(amounts),
//     });
// }
