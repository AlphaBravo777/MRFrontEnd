import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IProcessedStock } from '../../proc-stock-services/processed-stock';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-ps-ranking-view1',
    templateUrl: './ps-ranking-view1.component.html',
    styleUrls: ['./ps-ranking-view1.component.scss']
})
export class PsRankingView1Component implements OnInit {

    currentIndex;
    previousIndex;
    currentContainer;
    previousContainer;
    // @Input() containers: IProcessedStock[];
    @Input() filteredList: IProcessedStock[];
    @Input() filterName: string;
    @Output() newList: EventEmitter<any> = new EventEmitter<any>();
    changeList = [];

    constructor() {
    }

    ngOnInit() {

    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
                const b = event.container.element.nativeElement.id;
                console.log(b[b.length - 1]);
                console.log(event.container.element.nativeElement.id, event.previousContainer.element.nativeElement.id);
        }
    }

    sendPositionAndList() {
        this.newList.emit(this.filteredList);
    }

}
