import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { InsertOrderService } from '../1#insert-order-services/insert-order.service';
import { Subscription } from 'rxjs';
import { DialogBoxService } from 'src/app/home/core/dialog-box/dialog-box.service';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';

@Component({
    selector: 'app-insert-order-data',
    templateUrl: './insert-order-data.component.html',
    styleUrls: ['./insert-order-data.component.scss']
})
export class InsertOrderDataComponent implements OnInit, OnDestroy {

    orderForm: FormGroup;
    relevantAccountsArray: IAccountDetails[] = [];
    productsToChooseFrom = [];
    subscription: Subscription;
    subscription2: Subscription;

    constructor(private fb: FormBuilder,
        private insertOrderService: InsertOrderService,
        private dialogBoxService: DialogBoxService) { }

    ngOnInit() {
        this.dialogBoxService.popUpMessage('MAKE SURE THAT YOU ARE ON THE DAY THAT YOU WANT TO ENTER THE ORDERS !!!');
        this.buildform();
        this.onFormChanges();
    }

    buildform() {
        this.orderForm = this.fb.group({
            accountid: [''],
            accountID: [''],
            parentAccountid: [''],
            accountMRid: [''],
            commonName: ['Enter Account number'],
            routeName: [''],
            routeid: [''],
            timeStampid: [''],
            timeStampID: [''],
            shortDate: [''],
            orders: this.fb.array([])
        });
        this.createOrders(null, '' , null);
    }

    createOrders(productid, productMRid, amount) {
        const control = <FormArray>this.orderForm.controls.orders;
        control.push(this.fb.group({
            productid: [productid],
            productMRid: [productMRid],
            amount: [amount],
            allowed: [false],
        }));
    }

    searchAccounts(accountMRid) {
        this.subscription = this.insertOrderService.searchForAccount(accountMRid).subscribe(
            data => this.relevantAccountsArray = data
        );
    }

    getAccountProducts(productID) {
        this.insertOrderService.getAccountProducts(productID).subscribe(data =>
            this.productsToChooseFrom = data
        );
    }

    productSelection(product) {
        for (let prod = 0; prod < this.productsToChooseFrom.length; prod++) {
            const ordersControl = (<FormArray>this.orderForm.get('orders')).at(product.index);
            ordersControl.get('productMRid').setValue(product.productMRid.toUpperCase());
            if (this.productsToChooseFrom[prod].productMRid === product.productMRid.toUpperCase()) {
                console.log('There was a match ', ordersControl);
                ordersControl.get('allowed').setValue(true);
                ordersControl.get('productid').setValue(this.productsToChooseFrom[prod].productid);
                for (let order = 0; order < this.orderForm.get('orders').value.length; order++) {
                    // console.log('The current product names are ', this.orderForm.get('orders').value[order].productMRid);
                    if (product.productMRid.toUpperCase() === this.orderForm.get('orders').value[order].productMRid.toUpperCase() &&
                    order !== product.index) {
                        ordersControl.get('allowed').setValue(false);
                    }
                }
                break;
            }
            ordersControl.get('allowed').setValue(false);
            ordersControl.get('productid').setValue(null);
        }
    }

    onFormChanges() {
        this.subscription2 = this.orderForm.valueChanges.subscribe(newForm => {
            const ordersLength = newForm.orders.length;
            console.log(newForm);
            if (newForm.orders[ordersLength - 1].amount !== null) {
                this.createOrders(null, '', null);
            }
        });
    }

    accountSelection(accountSelected) {
        console.log('The store you have selected = ', accountSelected);
        this.relevantAccountsArray = [];
        this.getAccountProducts(accountSelected.accountData.accountID);
        this.orderForm.patchValue(accountSelected.accountData);
    }

    orderFormSubmit() {

        this.insertOrderService.insertNewOrder(JSON.parse(JSON.stringify(this.orderForm.value)));
        this.buildform();
        this.onFormChanges();
        // console.log('The form will now be submitted', this.orderForm.value);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }
    }

}

// give a message showing that you have to go to the day that the order must be delivered to enter it.
// have a place for the main account and then secondary account (this is just pnp)
// open a place to enter an order
// when order is pressed to enter, make sure that there is not one yet, when there is allow user to choose other date

// -- remember that this form should be very quick and user friendly on a tablet too (tannie Bettie) --
// when the form is opened, work out the week number and insert in plain sight (make it flash 3 times?)
// create input to start and search for accounts, you must be able to type A0134Deli to get to account A01 34 deli
// have a dropdown list again of all the clients that are available to choose from, have the account as well as the names handy
// so that someone can use the account box as a search box as well: "A0134deli Shoshanguve crossing"
// look at a custom keypad for tablet users
// after each product was chosen, highlight the product with green to show that it was already used
// when you have a dropdown list of all the stores, have a picture next to them to show the kind of brand
// now insert the route, with the loading date, as well as the delivery date
// next to the route, have a tick box that says 'lock route', and then when ever the account changes, do not change the route name
// do the same as above for the loading day box as well (tick box that freezes the loading day)
// when he have chosen the account that he wants, get all the products the he can choose from
// make button that shows the history of his last order (and button to copy it), and also the last 5 orders, with min max amounts
// make the order history buttons, so that you can just click it and it will add that product and amount


// later have option to email order when it was placed
