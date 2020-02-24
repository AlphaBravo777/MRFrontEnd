import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SmallStockTakeService {

    constructor() { }

    exportToCsv(filename, rows) {

        const processRow = (row) => {
            console.log('Row = ', row);
            let finalVal = '';
            for (let j = 0; j < row.length; j++) {
                let innerValue = row[j] === null ? '' : row[j].toString();
                console.log('Innervalue = ', innerValue);
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                }
                let result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0) {
                    result = '"' + result + '"';
                }
                if (j > 0) {
                    finalVal += ',';
                }
                finalVal += result;
            }
            return finalVal + '\n';
        };

        let csvFile = '';
        console.log('Length = ', rows.length);
        for (let i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        console.log('CSV = ', csvFile);

        const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
            console.log('IE 10 Something');
        } else {
            console.log('NOT IE 10');
            const link = document.createElement('a');
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
}
