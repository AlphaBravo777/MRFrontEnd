import { Component, OnInit } from '@angular/core';
import { InsertPnpCsvService } from '../1#insert-pnp-csv-services/insert-pnp-csv.service';

@Component({
  selector: 'mr-insert-insert-pnp-csv-data',
  templateUrl: './insert-pnp-csv-data.component.html',
  styleUrls: ['./insert-pnp-csv-data.component.scss']
})
export class InsertPnpCsvDataComponent implements OnInit {

    constructor(private insertPnPCSVService: InsertPnpCsvService) {}

    selectedCSVFile = null;

    ngOnInit() {}

    fileSelected(file) {
        this.insertPnPCSVService.fileSelected(file);
    }
}
