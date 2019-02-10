import { Component, OnInit } from '@angular/core';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';

@Component({
    selector: 'app-change-test-data',
    templateUrl: './change-test-data.component.html',
    styleUrls: ['./change-test-data.component.scss']
})
export class ChangeTestDataComponent implements OnInit {

    data1 = [
        {
            name: 'alfa', data: [
                { name: 'alfaData1a', data: [{ name: 'alfaData1b' }] },
                { name: 'alfaData2a', data: [{ name: 'alfaData2b' }] }
            ]
        },
        {
            name: 'bravo', data: [
                { name: 'bravoData1a', data: [{ name: 'bravoData1b' }] },
                { name: 'bravoData2a', data: [{ name: 'bravoData2b' }] }
            ]
        },
        {
            name: 'charlie', data: [
                { name: 'charlieData1a', data: [{ name: 'charlieData1b' }] },
                { name: 'charlieData2a', data: [{ name: 'charlieData2b' }] }
            ]
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
