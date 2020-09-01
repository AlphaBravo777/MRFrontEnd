import { Component, OnInit, Input } from '@angular/core';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IPalletPickedDetails } from 'src/app/home/shared/services/pnpServices/pnp-shared-interfaces';

@Component({
  selector: 'app-pnp-pallets-view2',
  templateUrl: './pnp-pallets-view2.component.html',
  styleUrls: ['./pnp-pallets-view2.component.scss']
})
export class PnpPalletsView2Component implements OnInit {

  @Input() calculatedPallets: IPalletPickedDetails[];
  @Input() currentDatePackage: IDate;

  constructor() {}

  ngOnInit() {
    //   console.log('View2 =', this.calculatedPallets);
  }

}
