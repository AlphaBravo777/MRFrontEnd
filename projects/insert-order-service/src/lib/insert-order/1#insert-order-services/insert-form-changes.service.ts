import { Injectable } from '@angular/core';
import { InsertFormService } from './insert-form.service';
import { FormGroup, FormArray } from '@angular/forms';
import { IProductGroupName, IProductDetails, IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { ICustomRadioButton } from 'src/app/home/shared/components/custom-radio-group/radio-button-interface';

@Injectable({
    providedIn: 'root'
})
export class InsertFormChangesService {

    orderForm: FormGroup;
    routeForm: FormGroup;

    constructor(private insertFormService: InsertFormService) {}

    getOrderInsertForm(): FormGroup {
        this.orderForm = this.insertFormService.getInsertForm();
        return this.orderForm;
    }

    getRouteInsertForm(): FormGroup {
        this.routeForm = this.insertFormService.getRouteInsertForm();
        return this.routeForm;
    }

    resetOrderForm() {
        this.orderForm.reset();
        const productListToPickFromArray = <FormArray>this.orderForm.controls['productListToPickFrom'];
        while (0 !== productListToPickFromArray.length) {
            productListToPickFromArray.removeAt(0);
        }
        const ordersArray = <FormArray>this.orderForm.controls['orders'];
        while (0 !== ordersArray.length) {
            ordersArray.removeAt(0);
        }
    }

    insertDatesAndUser(datePackage: IDate) {
        this.orderForm.get('timeStampid').setValue(datePackage.id);
        this.orderForm.get('timeStampID').setValue(datePackage.nodeID);
        this.orderForm.get('orderDate').setValue(datePackage.shortDate);
        this.orderForm.get('userid').setValue(JSON.parse(localStorage.getItem('userID')));
    }

    insertAccountDetails(account: IAccountDetails) {
        this.insertMainAccountDetails(account);
        this.insertFormProductGroup(account.productGroupid);
    }

    insertMainAccountDetails(account: IAccountDetails) {
        this.orderForm.get('accountMRid').setValue(account.accountMRid);
        this.orderForm.get('commonName').setValue(account.commonName);
        this.orderForm.get('accountName').setValue(account.accountName);
        this.orderForm.get('accountid').setValue(account.accountid);
        this.orderForm.get('accountID').setValue(account.accountID);
        this.orderForm.get('franchiseName').setValue(account.franchiseName);
        this.orderForm.get('franchiseid').setValue(account.franchiseid);
        this.insertOrderNumber();
    }

    insertOrderNumber(orderNumber?: string) {
        if (orderNumber || orderNumber === '') {
            this.orderForm.get('orderNumber').setValue(orderNumber);
        } else {
            this.orderForm.get('orderNumber').setValue(
                this.orderForm.get('accountMRid').value + '//' +
                this.orderForm.get('orderDate').value + '//' +
                this.orderForm.get('accountid').value + '//' + 1);
        }
    }

    insertFormProductGroup(productGroupDetail: IProductGroupName) {
        const control = this.orderForm.get('productGroupid');
        control.get('id').setValue(productGroupDetail.id);
        control.get('ID').setValue(productGroupDetail.ID);
        control.get('groupName').setValue(productGroupDetail.groupName);
    }

    insertRouteDetails(route: IRoute) {
        this.routeForm.get('routeid').setValue(route.routeid);
        this.routeForm.get('routeName').setValue(route.routeName);
    }

    insertProductUnitMeasurement(unit: ICustomRadioButton) {
        this.routeForm.get('productUnitMeasurement').setValue(unit.buttonid);
    }

    insertProductsToPickFrom(products: IProductDetails[]) {
        // this.insertForm.get('productListToPickFrom').setValue([]);
        this.insertFormService.createProductListToPickFrom(products);
    }

    insertExistingOrder(order: IOrderDetails, route: IRoute) {
        console.log('The route = ', route);
        this.insertOrderDetails(order);
        this.insertRouteDetails(route);

        order.orders.forEach(product => this.addProductToOrdersAndRemoveFromAvailableList(product));
    }

    insertOrderDetails(order: IOrderDetails) {
        this.orderForm.controls['orderNumber'].setValue(order.orderNumber);
        this.orderForm.controls['orderid'].setValue(order.orderid);
    }

    removeAnyOrderedProductsFromAvailableList() {
        const productListToPickFromArray: IProductDetails[] = this.orderForm.controls['productListToPickFrom'].value;
        const orderedProducts = <FormArray>this.orderForm.controls.orders;
        let a = 0;
        for (const control of orderedProducts['controls']) {
            const productFromProductList: IProductDetails = productListToPickFromArray.find((prod) =>
                control.value.productMRid.toUpperCase() === prod.productMRid);
            if (productFromProductList) {
                const tempRemovedProduct = this.removeProductFromAvailableList(productFromProductList);
                const removedProduct: IProductOrderDetails = Object.assign(
                    {
                        amount: control.value.amount,
                        userid: JSON.parse(JSON.stringify(localStorage.getItem('userID'))),
                        orderDetailsid: null,
                        amountid: null
                    }, tempRemovedProduct);
                control.setValue(removedProduct);
            }
            a += 1;
        }
    }

    makeSureAllMRProductidsAreUpperCase() {
        const orderedProducts = <FormArray>this.orderForm.controls.orders;
        for (const control of orderedProducts['controls']) {
            const placeholderProduct: IProductOrderDetails = Object.assign(control.value);
            placeholderProduct.productMRid = placeholderProduct.productMRid.toUpperCase();
            control.setValue(placeholderProduct);
        }
    }

    private addProductToOrdersAndRemoveFromAvailableList(product: IProductOrderDetails) {
        const productListToPickFromArray: IProductDetails[] = this.orderForm.controls['productListToPickFrom'].value;
        // console.log('PRODUCTS ARE: ', JSON.parse(JSON.stringify(productListToPickFromArray)));
        const productFromProductList = productListToPickFromArray.find(prod => product.productid === prod.productid);
        this.insertFormService.insertProductOrderFields(productFromProductList, product.amountid, product.amount);
        this.removeProductFromAvailableList(productFromProductList);
    }

    addAvailableProductToOrderedProducts(product: IProductDetails) {
        this.insertFormService.insertProductOrderFields(product, undefined, undefined);
        this.removeProductFromAvailableList(product);
    }

    private removeProductFromAvailableList(product: IProductDetails): IProductDetails {
        const productListsControls = <FormArray>this.orderForm.controls.productListToPickFrom;
        let a = 0;
        for (const control of productListsControls['controls']) {
            if (control.value.productid === product.productid) {
                const removedProduct: IProductDetails = control.value;
                productListsControls.removeAt(a);
                return removedProduct;
            }
            a += 1;
        }
    }

    changeProductMRidValidation(flag: boolean, index) {
        const orderNum = 'orders.' + index + '.productMRid';
        const order = <FormArray>this.orderForm.get(orderNum);
        if (flag) {
            order.setErrors(null);
        } else {
            order.setErrors({error: 'Product not in list'});
        }
    }

    deleteOrder(index) {
        const orders = <FormArray>this.orderForm.get('orders');
        const amountid = orders.controls[index].value.amountid;
        orders.removeAt(index);
        return amountid;
    }

}
