import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AutoCreateBatchService {

    constructor() { }

    createTodaysBatchIfNotExist() {
        console.log('I would be creating todays batch now')

    }

    private createBatch(weeknr, daynr, year) {
        // Here we would pass in this.createTodaysBatchIfNotExist with todays data, or data that was picked from the create-batch component
    }
}
