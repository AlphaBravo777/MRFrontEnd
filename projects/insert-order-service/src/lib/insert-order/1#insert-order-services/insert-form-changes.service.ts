import { Injectable } from '@angular/core';
import { InsertFormService } from './insert-form.service';
import { FormGroup, FormArray } from '@angular/forms';
import { IProductGroupName, IProductDetails, IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IOrderDetails } from '../../#sharedServices/insert-order-service-Interfaces';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';

@Injectable({
    providedIn: 'root'
})
export class InsertFormChangesService {

    insertForm: FormGroup;

    constructor(private insertFormService: InsertFormService) {}

    getInsertForm(): FormGroup {
        this.insertForm = null;
        this.insertForm = this.insertFormService.getInsertForm();
        return this.insertForm;
    }

    insertDatesAndUser(datePackage: IDate) {
        this.insertForm.get('timeStampid').setValue(datePackage.id);
        this.insertForm.get('timeStampID').setValue(datePackage.nodeID);
        this.insertForm.get('orderDate').setValue(datePackage.shortDate);
        this.insertForm.get('userid').setValue(JSON.parse(localStorage.getItem('userID')));
    }

    changeAccountDetails(account: IAccountDetails) {
        console.log('Change Account details = ', account);
        // Here we can maybe subscribe to the datePackage so that we change the orderName as the date changes
        this.insertForm.get('accountMRid').setValue(account.accountMRid);
        this.insertForm.get('commonName').setValue(account.commonName);
        this.insertForm.get('accountName').setValue(account.accountName);
        this.insertForm.get('accountid').setValue(account.accountid);
        this.insertForm.get('accountID').setValue(account.accountID);
        this.insertForm.get('franchiseName').setValue(account.franchiseName);
        this.insertForm.get('franchiseid').setValue(account.franchiseid);
        // this.insertForm.get('orders').setValue([]);
        // this.insertForm.get('productListToPickFrom').setValue([]);
        const orderDate = this.insertForm.get('orderDate').value;
        console.log('Orderdate = ', orderDate);
        this.insertForm.get('orderNumber').setValue(account.accountMRid + '//' + orderDate + '//' + account.accountid + '//' + 1);
    }

    insertExistingOrder(order: IOrderDetails) {
        // Here we can maybe subscribe to the datePackage so that we change the orderName as the date changes
        this.insertForm.get('orderid').setValue(order.orderid);
        this.insertForm.get('accountMRid').setValue(order.accountMRid);
        this.insertForm.get('commonName').setValue(order.commonName);
        this.insertForm.get('accountName').setValue(order.accountName);
        this.insertForm.get('accountid').setValue(order.accountid);
        this.insertForm.get('accountID').setValue(order.accountID);
        this.insertForm.get('franchiseName').setValue(order.franchiseName);
        this.insertForm.get('franchiseid').setValue(order.franchiseid);
        const orderDate = this.insertForm.get('orderDate').value;
        this.insertRouteDetails({routeid: order.routeid, routeName: order.routeName});
        console.log('Orderdate = ', orderDate);
        this.insertForm.get('orderNumber').setValue(order.accountMRid + '//' + orderDate + '//' + order.accountid + '//' + 1);
        order.orders.forEach(product => this.addAlreadyInsertedProductToOrderedProducts(product));
    }

    changeFormProductGroup(productGroupDetail: IProductGroupName) {
        const control = this.insertForm.get('productGroupid');
        console.log('Here is the productGroup control: ', control);
        control.get('id').setValue(productGroupDetail.id);
        control.get('ID').setValue(productGroupDetail.ID);
        control.get('groupName').setValue(productGroupDetail.groupName);
    }

    insertRouteDetails(route: IRoute) {
        this.insertForm.get('routeid').setValue(route.routeid);
        this.insertForm.get('routeName').setValue(route.routeName);
    }

    clearAccountMainValues() {
        this.insertForm.get('commonName').setValue(null);
        this.insertForm.get('accountMRid').setValue(null);
        this.insertForm.get('accountid').setValue(null);
        this.insertForm.get('orderNumber').setValue(null);
        this.insertForm.get('orderid').setValue(null);
        // this.insertForm.get('productListToPickFrom').setValue([]);
        const productListToPickFromArray = <FormArray>this.insertForm.controls['productListToPickFrom'];
        while (0 !== productListToPickFromArray.length) {
            productListToPickFromArray.removeAt(0);
        }
        const ordersArray = <FormArray>this.insertForm.controls['orders'];
        while (0 !== ordersArray.length) {
            ordersArray.removeAt(0);
        }
    }

    insertProductsToPickFrom(products: IProductDetails[]) {
        this.insertFormService.createProductListToPickFrom(products);
    }

    addAlreadyInsertedProductToOrderedProducts(product: IProductOrderDetails) {
        // console.log('DELTA (Products that were inserted 1): ', JSON.parse(JSON.stringify(product)));
        const productListToPickFromArray: IProductDetails[] = this.insertForm.controls['productListToPickFrom'].value;
        // console.log('DELTA (Products that were inserted 2): ', JSON.parse(JSON.stringify(productListToPickFromArray)));
        const productFromProductList = productListToPickFromArray.find(prod => product.productid === prod.productid);
        this.insertFormService.insertProductOrderFields(productFromProductList, product.amountid, product.amount);
        this.removeProductFromAvailableList(productFromProductList);
    }

    addAvailableProductToOrderedProducts(product: IProductDetails) {
        this.insertFormService.insertProductOrderFields(product, undefined, undefined);
    }

    removeProductFromAvailableList(product: IProductDetails) {
        const productListsControls = <FormArray>this.insertForm.controls.productListToPickFrom;
        let a = 0;
        for (const control of productListsControls['controls']) {
            if (control.value.productid === product.productid) {
                productListsControls.removeAt(a);
            }
            a += 1;
        }
    }

    changeProductMRidValidation(flag: boolean, index) {
        const orderNum = 'orders.' + index + '.productMRid';
        const order = <FormArray>this.insertForm.get(orderNum);
        if (flag) {
            order.setErrors(null);
        } else {
            order.setErrors({error: 'Product not in list'});
        }
    }

    deleteOrder(index) {
        const orders = <FormArray>this.insertForm.get('orders');
        const amountid = orders.controls[index].value.amountid;
        orders.removeAt(index);
        return amountid;
    }

}
