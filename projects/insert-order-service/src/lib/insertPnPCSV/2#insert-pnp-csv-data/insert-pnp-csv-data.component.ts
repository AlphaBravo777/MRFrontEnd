import { Component, OnInit } from '@angular/core';
import { IPnPCSVFormat, IPnPCSVData } from '../../#sharedServices/insert-order-service-Interfaces';
import { ConvertPnpCsvDataFactoryService } from '../1#insert-pnp-csv-services/convert-pnp-csv-data-factory.service';

@Component({
  selector: 'mr-insert-insert-pnp-csv-data',
  templateUrl: './insert-pnp-csv-data.component.html',
  styleUrls: ['./insert-pnp-csv-data.component.scss']
})
export class InsertPnpCsvDataComponent implements OnInit {

    constructor(private convertPnPCVDataFactoryService: ConvertPnpCsvDataFactoryService) {}

    selectedCSVFile = null;

    ngOnInit() {}

    csvTOjson(csv): IPnPCSVData[] {
        const lines = csv.split('\n');
        const result: IPnPCSVData[] = [];
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
            const obj: IPnPCSVFormat = {};
            const currentline = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            // const tempObj: IPnPCSVData =  factoryConvertPnPRawData(obj);
            result.push(this.convertPnPCVDataFactoryService.factoryConvertPnPRawData(obj));
        }
        // return JSON.parse(JSON.stringify(result));
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
    }
}
