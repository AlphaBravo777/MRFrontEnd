import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChecklistArea } from './checklist-interface';

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {

    private checklistArea = new BehaviorSubject<IChecklistArea>({name: 'High-Risk', areaid: 1, areaID: 'Q2hlY2tsaXN0QXJlYVR5cGU6MQ=='});
    currentChecklistArea$ = this.checklistArea.asObservable();

    constructor() { }

    setChecklistArea(areaData: IChecklistArea) {
        console.log('setChecklistArea = ', areaData);
        this.checklistArea.next(areaData);
    }

}
