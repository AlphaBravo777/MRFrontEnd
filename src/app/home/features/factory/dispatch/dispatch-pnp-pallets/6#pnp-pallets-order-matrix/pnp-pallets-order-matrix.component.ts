import { Component, OnInit, Input } from '@angular/core';
import { IPnPOrderTotals, IPnPOrderMatrix } from 'src/app/home/shared/services/pnpServices/pnp-shared-interfaces';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Component({
  selector: 'app-pnp-pallets-order-matrix',
  templateUrl: './pnp-pallets-order-matrix.component.html',
  styleUrls: ['./pnp-pallets-order-matrix.component.scss']
})
export class PnpPalletsOrderMatrixComponent implements OnInit {

  constructor() { }

  @Input() pnpOrderMatrix: IPnPOrderMatrix;
  @Input() pnpOrderTotals: IPnPOrderTotals;
  @Input() currentDatePackage: IDate;

  ngOnInit() {
  }

}
