import { Component, OnInit } from '@angular/core';
import * as Excel from 'exceljs';


@Component({
    selector: 'app-admin-excel-test',
    templateUrl: './admin-excel-test.component.html',
    styleUrls: ['./admin-excel-test.component.scss']
})
export class AdminExcelTestComponent implements OnInit {

    constructor() { }

    myWorkbook = new Excel.Workbook();


    ngOnInit(): void {

    }

    createExcelFile() {
        console.log('Creating excel file');
        this.myWorkbook.calcProperties.fullCalcOnLoad = true;
        const sheet = this.myWorkbook.addWorksheet('My Sheet');
    }

    selectFolder(folderPath) {
        const theFiles = folderPath.target.files;
        const relativePath = theFiles[0].webkitRelativePath;
        const folder = relativePath.split('/');
        console.log(folder[0]);
    }

}
