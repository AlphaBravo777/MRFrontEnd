import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-insert-order-data',
    templateUrl: './insert-order-data.component.html',
    styleUrls: ['./insert-order-data.component.scss']
})
export class InsertOrderDataComponent implements OnInit {

    constructor() { }


    ngOnInit() {
    }

}

// -- remember that this form should be very quick and user friendly on a tablet too (tannie Bettie) --
// when the form is opened, work out the week number and insert in plain sight (make it flash 3 times?)
// create input to start and search for accounts, you must be able to type A0134Deli to get to account A01 34 deli
// have a dropdown list again of all the clients that are available to choose from, have the account as well as the names handy
// so that someone can use the account box as a search box as well: "A0134deli Shoshanguve crossing"
// look at a custom keypad for tablet users
// now insert the route, with the loading date, as well as the delivery date
// next to the route, have a tick box that says 'lock route', and then when ever the account changes, do not change the route name
// do the same as above for the loading day box as well (tick box that freezes the loading day)
// when he have chosen the account that he wants, get all the products the he can choose from
// make button that shows the history of his last order (and button to copy it), and also the last 5 orders, with min max amounts
// make the order history buttons, so that you can just click it and it will add that product and amount


// later have option to email order when it was placed
