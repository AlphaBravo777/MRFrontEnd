import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';

@Component({
    selector: 'app-proc-stock-view2',
    templateUrl: './proc-stock-view2.component.html',
    styleUrls: ['./proc-stock-view2.component.scss']
})
export class ProcStockView2Component implements OnInit {

    @Input() productGroup;
    @Input() filterGroup;
    @Output() productPicked: EventEmitter<any> = new EventEmitter<any>();
    showInput = false;
    amount;
    selectedIndex = null;

    constructor(private toolboxGroup: ToolboxGroupService) { }

    ngOnInit() {
        this.productGroup = this.toolboxGroup.multiFieldSorting(this.productGroup, ['factoryFilterRating', 'factoryRanking']);
    }

    productPick(value) {
        if (this.selectedIndex !== value.index) {
            this.selectedIndex = value.index;
        } else {
            this.selectedIndex = null;
        }
        this.productPicked.emit(value);
    }

}
