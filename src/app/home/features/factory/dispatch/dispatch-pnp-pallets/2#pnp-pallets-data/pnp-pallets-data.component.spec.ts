import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular-boost';

import { PnpPalletsDataComponent } from './pnp-pallets-data.component';
import { PnpPalletsRegionsComponent } from '../4#pnp-pallets-regions/pnp-pallets-regions.component';
import { PnpPalletsOrderMatrixComponent } from '../6#pnp-pallets-order-matrix/pnp-pallets-order-matrix.component';
import { PnpPalletsSummaryComponent } from '../5#pnp-pallets-summary/pnp-pallets-summary.component';
import { PnpPalletsView2Component } from '../3b#pnp-pallets-view2/pnp-pallets-view2.component';
import { BoxShadowContainerComponent } from 'src/app/home/shared/dropdown-table/box-shadow-container/box-shadow-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('PnpPalletsDataComponent', () => {
    let component: PnpPalletsDataComponent;
    let fixture: ComponentFixture<PnpPalletsDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule, ApolloTestingModule],
            declarations: [
                PnpPalletsDataComponent,
                PnpPalletsRegionsComponent,
                PnpPalletsOrderMatrixComponent,
                PnpPalletsSummaryComponent,
                PnpPalletsView2Component,
                BoxShadowContainerComponent
            ],
            providers: [Apollo]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PnpPalletsDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
