import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProductionStockByFactoryArea } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { ProductStockFormService } from '../1#product-stock-services/product-stock-form.service';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';

interface MyWindow extends Window {
    onePageCanvas: any;
}

declare var window: MyWindow;

@Component({
    selector: 'stock-production-stock-data',
    templateUrl: './production-stock-data.component.html',
    styleUrls: ['./production-stock-data.component.scss']
})
export class ProductionStockDataComponent implements OnInit {

    @ViewChild('dataAvailable') dataAvailable: ElementRef;
    @ViewChild('content', { 'static': true }) content: ElementRef;
    productionStock$: Observable<IProductionStockByFactoryArea[]>;
    productionStock: IProductionStockByFactoryArea[];
    mainStockForm: FormArray<IProductionStockByFactoryArea>
    noDataMessage = "No data found ..."
    errorMessage: string;

    constructor(
        private productionStockService: ProductionStockService,
        private productStockFormService: ProductStockFormService
    ) { }

    ngOnInit(): void {
        this.getProductionStock()
    }

    getProductionStock() {
        this.errorMessage = ''
        this.productionStock$ = this.productionStockService.getAllProducts().pipe(
            tap(data => this.productionStock = data),
            tap(data => this.mainStockForm = this.productStockFormService.createMainStockForm(data)),
            catchError((err: any) => {
                // Wait a turn because errorMessage already set once this turn
                setTimeout(() => this.errorMessage = err.message || err.toString());
                // return of(this.noDataMessage); // reset message to placeholder
                return of([]); // reset message to placeholder
            })
        );
    }

    generatePDF() {  // This works for a single page of pdf data

        const div = document.getElementById('content');
        const options = {
            background: 'white',
            scale: 3
        };

        html2canvas(div, options).then((canvas) => {

            var img = canvas.toDataURL("image/PNG");
            var doc = new jsPDF('p', 'mm', 'a4', true);

            // Add image Canvas to PDF
            const bufferX = 5;
            const bufferY = 5;
            const imgProps = (<any>doc).getImageProperties(img);
            const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined);

            return doc;
        }).then((doc) => {
            doc.save('stock-take-list.pdf');
        });
    }

    makePDF() {

        const div = document.getElementById('content');
        const options = {
            background: 'white',
            scale: 1
        };

        html2canvas(div, options).then((canvas) => {
                //! MAKE YOUR PDF
                var pdf = new jsPDF('p', 'pt', 'a4', true); // Page width must be 974px

                for (var i = 0; i <= div.clientHeight / 980; i++) {
                    console.log('Height: ', div.clientHeight, ' with: ', div.clientWidth)
                    let pageHeight = 1218
                    let pageWidth = 910
                    //! This is all just html2canvas stuff
                    var srcImg = canvas;
                    var sX = 0;
                    var sY = pageHeight * i; // start 980 pixels down for every new page
                    var sWidth = pageWidth;
                    var sHeight = pageHeight;
                    var dX = 0;
                    var dY = 0;
                    var dWidth = pageWidth;
                    var dHeight = pageHeight;

                    window.onePageCanvas = document.createElement("canvas");
                    window.onePageCanvas.setAttribute('width', pageWidth);
                    window.onePageCanvas.setAttribute('height', pageHeight);
                    var ctx = window.onePageCanvas.getContext('2d');
                    // details on this usage of this function: 
                    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                    ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

                    // document.body.appendChild(canvas);
                    var canvasDataURL = window.onePageCanvas.toDataURL("image/png", 1.0);

                    var width = window.onePageCanvas.width;
                    var height = window.onePageCanvas.clientHeight;

                    //! If we're on anything other than the first page,
                    // add another page
                    if (i > 0) {
                        // pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
                        pdf.addPage([612, 791], 'p'); //8.5" x 11" in pts (in*72)
                    }
                    //! now we declare that we're working on that page
                    pdf.setPage(i + 1);
                    //! now we add content to that page!
                    pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62));

                }
                //! after the for loop is finished running, we save the pdf.
                // pdf.save('Test.pdf');
                return pdf
        }).then((pdf) => {
            pdf.save('stock-take-list.pdf');
        });
    }

    printPage() {
        var divToPrint = document.getElementById('content');
        let newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }

}
