import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IProductionContainer, IStockTakeContainerHash } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { Observable, of } from 'rxjs';
import { ProductionGraphqlStringService } from './production-graphql-string.service';
import { map } from 'rxjs/operators';
import { IItemGroupingTypeConnection, IItemGroupingTypeNodes } from 'projects/product-service/src/public-api';
import { IProductContainerDetailTypeNodes, IProductContainerGroupJunctionTypeNodes } from './interfaces/production-graphql.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductionGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private productionGraphqlStringService: ProductionGraphqlStringService
    ) { }

    getContainersData(getOnlyActiveProducts: boolean = true): Observable<IStockTakeContainerHash> {
        console.log('I am running the container info here')
        return this.apollo
            .watchQuery<IItemGroupingTypeConnection>({
                variables: {active: getOnlyActiveProducts},
                query: this.productionGraphqlStringService.ALL_STOCKTAKE_CONTAINERS_DATA
            })
            .valueChanges.pipe(
                map(result => this.consolidateContainers(result.data.nodeProdmsItemGrouping.edges))
            );
    }

    private consolidateContainers(containerData: IItemGroupingTypeNodes[]): IStockTakeContainerHash {

        const isFullStockTake = (groupData: IProductContainerGroupJunctionTypeNodes[]) => {
            let containerOnlyCountedDuringFullStockTake = false
            groupData.forEach(group => {
                if (group.node.productContainerGroupid.rowid === 1) {
                    containerOnlyCountedDuringFullStockTake = true
                }
            });
            return containerOnlyCountedDuringFullStockTake
        }

        console.log('consolidateContainers = ', containerData)
        const containerHash: IStockTakeContainerHash = {};
        for (let index = 0; index < containerData.length; index++) {
            const product = containerData[index];
            for (let i = 0; i < product.node.containerDetailNode.edges.length; i++) {
                const container: IProductContainerDetailTypeNodes = product.node.containerDetailNode.edges[i];
                for (let j = 0; j < container.node.productContainerid.productcontainerproductionareajunctionSet.edges.length; j++) {
                    const factoryArea = container.node.productContainerid.productcontainerproductionareajunctionSet.edges[j];
                    console.log('Containerid = ', container.node.productContainerid)

                    const newContainer: IProductionContainer = {
                        containerid: container.node.productContainerid.rowid,
                        containerNameid: container.node.productContainerid.containerNameid.rowid,
                        containerName: container.node.productContainerid.containerNameid.containerName,
                        containerRanking: null,
                        productid: product.node.itemid.rowid,
                        productMRid: product.node.itemid.defaultItemName,
                        proddescription: product.node.itemid.description,
                        factoryAreaName: factoryArea.node.productionAreaid.productionAreaName,
                        factoryAreaRanking: factoryArea.node.productionAreaid.ranking,
                        factoryAreaProductRanking: factoryArea.node.productionAreaRanking,
                        fullStockTake: isFullStockTake(container.node.productContainerid.productcontainergroupjunctionSet.edges),
                        showBatches: container.node.showBatches,
                        productContainerWeight: container.node.productContainerWeight,
                        batchGroupid: product.node.groupid.rowid,
                        batchName: product.node.groupid.groupName,
                        batchRanking: product.node.groupid.rankingInGroup,
                        brand: null,
                        packageWeight: product.node.itemid.itemweightorsize.itemShippingSize,
                        packaging: null,
                        productonhold: null,
                        productRankingInBatch: product.node.itemRanking,
                        unitWeight: product.node.itemid.itemweightorsize.weightOrSize,
                    }
                    containerHash[newContainer.containerid] = newContainer
                }
            }
            
        }
        console.log('Container hash = ', containerHash)
        return containerHash
    }

}
