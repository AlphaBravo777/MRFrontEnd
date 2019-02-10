import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-change-test-view2',
  templateUrl: './change-test-view2.component.html',
  styleUrls: ['./change-test-view2.component.scss']
})
export class ChangeTestView2Component implements OnInit {

    @Input() data1;

  constructor() { }

  ngOnInit() {
  }

}
