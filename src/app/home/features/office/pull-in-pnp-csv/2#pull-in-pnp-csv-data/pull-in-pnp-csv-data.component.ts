import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pull-in-pnp-csv-data',
    templateUrl: './pull-in-pnp-csv-data.component.html',
    styleUrls: ['./pull-in-pnp-csv-data.component.css']
})
export class PullInPnpCsvDataComponent implements OnInit {
    selectedCSVFile = null;
    constructor() {}

    ngOnInit() {}

    csvTOjson(csv) {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        // return JSON.stringify(result);
        return result;
    }

    loadHandler(event) {
        const text = event.target.result;
        console.log(this.csvTOjson(text));
    }

    fileSelected(file) {
        const reader = new FileReader();
        reader.readAsText(file.target.files[0]);
        reader.onload = e => {
            this.loadHandler(e);
        };
        // const reader = new FileReader();
        // let text = '';
        // reader.onload = function() {
        // text = reader.result;
        //     console.log('Reader = ', text);
        //     localStorage.setItem('pnpCsvFile', JSON.stringify(text));
        //   };
        // reader.readAsText(file.target.files[0]);
        // console.log('Selected CSV file = ', this.csvJSON(text));
        // console.log(file);
        // const url = file.target.files[0];
        // this.selectedCSVFile = file.target.files[0];
        // // localStorage.setItem('pnpCsvFile', JSON.stringify(file.target.files[0]));
        // console.log('Selected CSV file = ', this.selectedCSVFile);
        // // csv(localStorage.getItem('pnpCsvFile')).then(function(data) {
        // //     console.log('CSV DATA = ', data);
        // //   });
        // console.log('CSV DATA = ', localStorage.getItem('pnpCsvFile'));
    }
}
