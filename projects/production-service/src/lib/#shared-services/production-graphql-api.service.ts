import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IProductionContainer, IStockTakeContainerHash } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { Observable, of } from 'rxjs';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { ProductionGraphqlStringService } from './production-graphql-string.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductionGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private toolbox: ToolboxGroupService,
        private productionGraphqlStringService: ProductionGraphqlStringService
    ) { }

    getContainersData(getOnlyActiveProducts: boolean = true): Observable<IStockTakeContainerHash> {
        return this.apollo
            .watchQuery<any>({
                variables: {active: getOnlyActiveProducts},
                query: this.productionGraphqlStringService.ALL_STOCKTAKE_CONTAINERS_DATA
            })
            .valueChanges.pipe(
                map(result => this.consolidateContainers(this.toolbox.refractureGraphqlRawData(result)['nodeProdmsItemGrouping']))
            );
    }

    private consolidateContainers(containerData): IStockTakeContainerHash {

        const isFullStockTake = (groupData) => {
            let containerOnlyCountedDuringFullStockTake = false
            groupData.forEach(group => {
                if (group.productContainerGroupid.rowid === 1) {
                    containerOnlyCountedDuringFullStockTake = true
                }
            });
            return containerOnlyCountedDuringFullStockTake
        }

        // console.log('consolidateContainers = ', containerData)
        const containerHash: IStockTakeContainerHash = {};
        for (let index = 0; index < containerData.length; index++) {
            const product = containerData[index];
            for (let i = 0; i < product.containerDetailNode.length; i++) {
                const container = product.containerDetailNode[i];
                for (let j = 0; j < container.productContainerid.productcontainerproductionareajunctionSet.length; j++) {
                    const factoryArea = container.productContainerid.productcontainerproductionareajunctionSet[j];

                    const newContainer: IProductionContainer = {
                        containerid: container.productContainerid.rowid,
                        containerNameid: container.productContainerid.containerNameid.rowid,
                        containerName: container.productContainerid.containerNameid.containerName,
                        containerRanking: null,
                        productid: product.itemid.rowid,
                        productMRid: product.itemid.defaultItemName,
                        proddescription: product.itemid.description,
                        factoryAreaName: factoryArea.productionAreaid.productionAreaName,
                        factoryAreaRanking: factoryArea.productionAreaid.ranking,
                        factoryAreaProductRanking: factoryArea.productionAreaRanking,
                        fullStockTake: isFullStockTake(container.productContainerid.productcontainergroupjunctionSet),
                        showBatches: container.showBatches,
                        batchGroupid: product.groupid.rowid,
                        batchName: product.groupid.groupName,
                        batchRanking: product.groupid.rankingInGroup,
                        brand: null,
                        packageWeight: product.itemid.itemweightorsize.itemShippingSize,
                        packaging: null,
                        productonhold: null,
                        productRankingInBatch: product.itemRanking,
                        unitWeight: product.itemid.itemweightorsize.weightOrSize,
                    }
                    containerHash[newContainer.containerid] = newContainer
                }
            }
            
        }
        console.log('Container hash = ', containerHash)
        return containerHash
    }

}
