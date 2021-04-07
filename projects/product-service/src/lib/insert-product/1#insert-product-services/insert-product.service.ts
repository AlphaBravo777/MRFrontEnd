import { Injectable } from '@angular/core';
import { IItemBackend, factory_createBackendItemFromForm } from '../../#shared-services/interfaces/backend-item.interface';
import { IItemForm, IItemName, IItemGroup } from '../../#shared-services/interfaces/item.interface';
import { ProductApiService } from '../../#shared-services/product-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class InsertProductService {

    constructor(private productApiService: ProductApiService) {}

    insertOrUpdateItem(item: IItemForm): Observable<any> {
        const backendItem: IItemBackend = factory_createBackendItemFromForm(item);
        console.log('Form submit details = ', backendItem);
        return this.productApiService.insertOrUpdateItem(backendItem);
    }

}
