import { Component, OnInit, Input } from '@angular/core';
import { IChecksSingleArea, IChecklistArea } from '../../checklist-services/checklist-interface';

@Component({
  selector: 'app-checklist-read-view1',
  templateUrl: './checklist-read-view1.component.html',
  styleUrls: ['./checklist-read-view1.component.scss']
})
export class ChecklistReadView1Component implements OnInit {

    @Input() singleAreaChecks: IChecklistArea;

  constructor() { }

  ngOnInit() {
      console.log('checklist-read-view1' , this.singleAreaChecks);
  }

}
