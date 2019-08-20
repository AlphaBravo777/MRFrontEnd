import { Injectable } from '@angular/core';
import { InsertFormService } from './insert-form.service';
import { FormGroup, FormArray } from '@angular/forms';
import { IProductGroupName, IProductDetails, IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IOrderDetails } from '../../#sharedServices/insert-order-service-Interfaces';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InsertFormChangesService {

    insertForm: FormGroup;

    constructor(private insertFormService: InsertFormService) {}

    getInsertForm(): FormGroup {
        this.insertForm = this.insertFormService.getInsertForm();
        return this.insertForm;
    }

    resetForm() {
        this.insertForm.reset();
        const productListToPickFromArray = <FormArray>this.insertForm.controls['productListToPickFrom'];
        while (0 !== productListToPickFromArray.length) {
            productListToPickFromArray.removeAt(0);
        }
        const ordersArray = <FormArray>this.insertForm.controls['orders'];
        while (0 !== ordersArray.length) {
            ordersArray.removeAt(0);
        }
    }

    insertDatesAndUser(datePackage: IDate) {
        this.insertForm.get('timeStampid').setValue(datePackage.id);
        this.insertForm.get('timeStampID').setValue(datePackage.nodeID);
        this.insertForm.get('orderDate').setValue(datePackage.shortDate);
        this.insertForm.get('userid').setValue(JSON.parse(localStorage.getItem('userID')));
    }

    insertAccountDetails(account: IAccountDetails) {
        this.insertMainAccountDetails(account);
        this.insertFormProductGroup(account.productGroupid);
    }

    insertMainAccountDetails(account: IAccountDetails) {
        this.insertForm.get('accountMRid').setValue(account.accountMRid);
        this.insertForm.get('commonName').setValue(account.commonName);
        this.insertForm.get('accountName').setValue(account.accountName);
        this.insertForm.get('accountid').setValue(account.accountid);
        this.insertForm.get('accountID').setValue(account.accountID);
        this.insertForm.get('franchiseName').setValue(account.franchiseName);
        this.insertForm.get('franchiseid').setValue(account.franchiseid);
    }

    insertFormProductGroup(productGroupDetail: IProductGroupName) {
        const control = this.insertForm.get('productGroupid');
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
        // this.insertForm.get('productListToPickFrom').setValue([]);
        this.insertFormService.createProductListToPickFrom(products);
    }

    insertExistingOrder(order: IOrderDetails) {
        this.isnertOrderDetails(order);
        order.orders.forEach(product => this.addProductToOrdersAndRemoveFromAvailableList(product));
    }

    isnertOrderDetails(order: IOrderDetails) {
        this.insertForm.controls['orderNumber'].setValue(order.orderNumber);
        this.insertForm.controls['orderid'].setValue(order.orderid);
    }

    private addProductToOrdersAndRemoveFromAvailableList(product: IProductOrderDetails) {
        // console.log('DELTA (Products that were inserted 1): ', JSON.parse(JSON.stringify(product)));
        const productListToPickFromArray: IProductDetails[] = this.insertForm.controls['productListToPickFrom'].value;
        // console.log('DELTA (Products that were inserted 2): ', JSON.parse(JSON.stringify(productListToPickFromArray)));
        const productFromProductList = productListToPickFromArray.find(prod => product.productid === prod.productid);
        this.insertFormService.insertProductOrderFields(productFromProductList, product.amountid, product.amount);
        this.removeProductFromAvailableList(productFromProductList);
    }

    addAvailableProductToOrderedProducts(product: IProductDetails) {
        this.insertFormService.insertProductOrderFields(product, undefined, undefined);
        this.removeProductFromAvailableList(product);
    }

    private removeProductFromAvailableList(product: IProductDetails) {
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
